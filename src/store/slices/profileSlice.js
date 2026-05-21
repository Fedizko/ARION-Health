/**
 * profileSlice — Perfil do usuário (tabela profiles no Supabase).
 */

import { saveProfile, getProfile } from '../../utils/persistence'

export const createProfileSlice = (set, get) => ({
  displayName: '',
  conditions:  [],
  avatarUrl:   null,

  initProfile: async () => {
    const profile = await getProfile()
    if (profile) {
      set({
        displayName: profile.displayName ?? '',
        conditions:  profile.conditions  ?? [],
        avatarUrl:   profile.avatarUrl   ?? null,
      })
    }
  },

  updateProfile: async (partial) => {
    const current = {
      displayName: get().displayName,
      conditions:  get().conditions,
      avatarUrl:   get().avatarUrl,
    }
    const updated = { ...current, ...partial }
    const saved   = await saveProfile(updated)
    if (saved) set(saved)
  },
})
