/**
 * persistence.js — Camada de dados do ARIAN Health
 * Fonte primária: Supabase (Postgres + RLS).
 * Cache local em localStorage para resiliência offline (best-effort, last-write-wins).
 */

import { supabase }      from '../lib/supabase'
import { STORAGE_KEYS }  from './constants'

// =============================================================
// Camada genérica de cache local
// =============================================================
export const storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS[key]) ?? 'null')
    } catch {
      return null
    }
  },
  set:    (key, value) => localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value)),
  remove: (key)        => localStorage.removeItem(STORAGE_KEYS[key]),
}

// =============================================================
// Helpers internos
// =============================================================
const today = () => new Date().toISOString().split('T')[0]

async function currentUserId() {
  const { data } = await supabase.auth.getUser()
  return data?.user?.id ?? null
}

/** Converte linha do banco (snake_case) para o formato usado no app (camelCase) */
function rowToCheckIn(row) {
  if (!row) return null
  return {
    id:          row.id,
    date:        row.date,
    joints:      row.joints,
    energy:      row.energy,
    heartRate:   row.heart_rate,
    sensitivity: row.sensitivity,
    symptoms:    row.symptoms ?? [],
    mood:        row.mood,
    notes:       row.notes,
    timestamp:   row.created_at ? Date.parse(row.created_at) : Date.now(),
  }
}

// =============================================================
// Check-ins
// =============================================================

/**
 * saveCheckIn — upsert do check-in do dia (chave user_id+date).
 * @returns {Promise<object|null>} check-in salvo (camelCase) ou null em falha.
 */
export async function saveCheckIn(data) {
  const userId = await currentUserId()
  if (!userId) return null

  const payload = {
    user_id:     userId,
    date:        today(),
    joints:      data.joints ?? null,
    energy:      data.energy ?? null,
    heart_rate:  data.heartRate ?? null,
    sensitivity: data.sensitivity ?? null,
    symptoms:    data.symptoms ?? [],
    mood:        data.mood ?? null,
    notes:       data.notes ?? null,
  }

  const { data: row, error } = await supabase
    .from('check_ins')
    .upsert(payload, { onConflict: 'user_id,date' })
    .select()
    .single()

  if (error) {
    console.error('[persistence] saveCheckIn:', error.message)
    return null
  }

  // Atualiza cache local
  const saved = rowToCheckIn(row)
  const existing = (storage.get('checkIns') ?? []).filter(c => c.date !== saved.date)
  storage.set('checkIns', [...existing, saved])
  return saved
}

/** getCheckIns — Retorna todos os check-ins do usuário logado (mais recentes primeiro). */
export async function getCheckIns() {
  const userId = await currentUserId()
  if (!userId) return []

  const { data, error } = await supabase
    .from('check_ins')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) {
    console.warn('[persistence] getCheckIns: fallback ao cache:', error.message)
    return storage.get('checkIns') ?? []
  }

  const mapped = (data ?? []).map(rowToCheckIn)
  storage.set('checkIns', mapped)
  return mapped
}

/** getTodayCheckIn — Retorna o check-in de hoje ou null. */
export async function getTodayCheckIn() {
  const userId = await currentUserId()
  if (!userId) return null

  const { data, error } = await supabase
    .from('check_ins')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today())
    .maybeSingle()

  if (error) {
    console.warn('[persistence] getTodayCheckIn:', error.message)
    return null
  }
  return rowToCheckIn(data)
}

/** getCheckInDates — Datas dos check-ins (para cálculo de streak). */
export async function getCheckInDates() {
  const userId = await currentUserId()
  if (!userId) return []

  const { data, error } = await supabase
    .from('check_ins')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) return (storage.get('checkIns') ?? []).map(c => c.date)
  return (data ?? []).map(r => r.date)
}

// =============================================================
// Profile
// =============================================================

/** saveProfile — atualiza linha em profiles do usuário logado. */
export async function saveProfile(partial) {
  const userId = await currentUserId()
  if (!userId) return null

  const payload = {
    ...(partial.displayName !== undefined && { display_name: partial.displayName }),
    ...(partial.conditions  !== undefined && { conditions:   partial.conditions }),
    ...(partial.avatarUrl   !== undefined && { avatar_url:   partial.avatarUrl }),
    ...(partial.accessibility !== undefined && { accessibility: partial.accessibility }),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('[persistence] saveProfile:', error.message)
    return null
  }

  const profile = {
    displayName: data.display_name ?? '',
    conditions:  data.conditions ?? [],
    avatarUrl:   data.avatar_url,
  }
  storage.set('userProfile', profile)
  return profile
}

/** getProfile — Retorna o perfil do usuário logado ou null. */
export async function getProfile() {
  const userId = await currentUserId()
  if (!userId) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.warn('[persistence] getProfile: fallback ao cache:', error.message)
    return storage.get('userProfile')
  }
  if (!data) return null

  const profile = {
    displayName: data.display_name ?? '',
    conditions:  data.conditions ?? [],
    avatarUrl:   data.avatar_url,
    accessibility: data.accessibility,
  }
  storage.set('userProfile', profile)
  return profile
}

// =============================================================
// Acessibilidade (preferências de UX — mantidas só em localStorage)
// =============================================================
export function saveAccessibility(prefs) {
  storage.set('accessibility', prefs)
}

export function getAccessibility() {
  return storage.get('accessibility') ?? {
    highContrast: false,
    largerText:   false,
    simplifiedUI: false,
  }
}

// =============================================================
// Streak cache (otimização local — recomputo barato, então 1h basta)
// =============================================================
export function saveStreakCache(data) {
  storage.set('streakCache', { ...data, cachedAt: Date.now() })
}

export function getStreakCache() {
  const cache = storage.get('streakCache')
  if (!cache) return null
  if (Date.now() - cache.cachedAt > 3_600_000) return null
  return cache
}

// =============================================================
// Medicamentos
// =============================================================

export async function getMedications() {
  const userId = await currentUserId()
  if (!userId) return []
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) {
    console.warn('[persistence] getMedications:', error.message)
    return []
  }
  return data ?? []
}

export async function createMedication({ name, dosage, schedule }) {
  const userId = await currentUserId()
  if (!userId) return null
  const { data, error } = await supabase
    .from('medications')
    .insert({ user_id: userId, name, dosage, schedule })
    .select()
    .single()
  if (error) {
    console.error('[persistence] createMedication:', error.message)
    return null
  }
  return data
}

export async function deleteMedication(id) {
  const { error } = await supabase.from('medications').delete().eq('id', id)
  if (error) console.error('[persistence] deleteMedication:', error.message)
  return !error
}

export async function logMedicationTaken(medicationId) {
  const userId = await currentUserId()
  if (!userId) return null
  const { data, error } = await supabase
    .from('medication_logs')
    .insert({ user_id: userId, medication_id: medicationId })
    .select()
    .single()
  if (error) {
    console.error('[persistence] logMedicationTaken:', error.message)
    return null
  }
  return data
}

export async function getMedicationLogs(medicationId) {
  const userId = await currentUserId()
  if (!userId) return []
  const { data, error } = await supabase
    .from('medication_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('medication_id', medicationId)
    .order('taken_at', { ascending: false })
    .limit(50)
  if (error) return []
  return data ?? []
}
