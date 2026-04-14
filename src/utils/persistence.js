/**
 * persistence.js — Helpers de LocalStorage para o ARION Health
 * Ponto único de acesso ao armazenamento local
 */

import { STORAGE_KEYS } from './constants'

// Camada de acesso genérica
export const storage = {
  get:    (key) => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS[key]) ?? 'null')
    } catch {
      return null
    }
  },
  set:    (key, value) => localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value)),
  remove: (key)        => localStorage.removeItem(STORAGE_KEYS[key]),
}

// ============================
// Check-ins
// ============================

/**
 * saveCheckIn — Salva o check-in do dia. Impede duplicata na mesma data.
 * @param {Object} data — {joints, energy, heartRate, sensitivity, symptoms[], mood, notes}
 */
export function saveCheckIn(data) {
  const today    = new Date().toISOString().split('T')[0]
  const existing = storage.get('checkIns') ?? []
  const filtered = existing.filter(c => c.date !== today)
  filtered.push({ date: today, ...data, timestamp: Date.now() })
  storage.set('checkIns', filtered)
}

/** getCheckIns — Retorna todos os check-ins */
export function getCheckIns() {
  return storage.get('checkIns') ?? []
}

/** getTodayCheckIn — Retorna o check-in de hoje ou null */
export function getTodayCheckIn() {
  const today = new Date().toISOString().split('T')[0]
  return getCheckIns().find(c => c.date === today) ?? null
}

/** getCheckInDates — Retorna apenas as datas dos check-ins (para cálculo de streak) */
export function getCheckInDates() {
  return getCheckIns().map(c => c.date)
}

// ============================
// Perfil
// ============================

/** saveProfile — Salva/atualiza o perfil do usuário */
export function saveProfile(data) {
  const existing = storage.get('userProfile') ?? {}
  storage.set('userProfile', { ...existing, ...data })
}

/** getProfile — Retorna o perfil ou null */
export function getProfile() {
  return storage.get('userProfile')
}

// ============================
// Autenticação
// ============================

/** saveUser — Salva usuário registrado */
export function saveUser(user) {
  storage.set('userProfile', user)
}

/** getUser — Retorna usuário salvo */
export function getUser() {
  return storage.get('userProfile')
}

// ============================
// Acessibilidade
// ============================

/** saveAccessibility — Salva preferências de acessibilidade */
export function saveAccessibility(prefs) {
  storage.set('accessibility', prefs)
}

/** getAccessibility — Retorna preferências salvas */
export function getAccessibility() {
  return storage.get('accessibility') ?? {
    highContrast:  false,
    largerText:    false,
    simplifiedUI:  false,
  }
}

// ============================
// Streak Cache
// ============================

/** saveStreakCache — Salva resultado de streak para evitar recalcular */
export function saveStreakCache(data) {
  storage.set('streakCache', { ...data, cachedAt: Date.now() })
}

/** getStreakCache — Retorna cache do streak (válido por 1h) */
export function getStreakCache() {
  const cache = storage.get('streakCache')
  if (!cache) return null
  const oneHour = 3_600_000
  if (Date.now() - cache.cachedAt > oneHour) return null
  return cache
}
