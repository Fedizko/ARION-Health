/**
 * profileSlice — Perfil e configurações do usuário
 */

import { saveProfile, getProfile } from '../../utils/persistence'

export const createProfileSlice = (set, get) => ({
  displayName: '',
  conditions:  [],
  avatarUrl:   null,

  initProfile: () => {
    const profile = getProfile()
    if (profile) {
      set({
        displayName: profile.displayName ?? '',
        conditions:  profile.conditions  ?? [],
        avatarUrl:   profile.avatarUrl   ?? null,
      })
    }
  },

  updateProfile: (partial) => {
    const current = {
      displayName: get().displayName,
      conditions:  get().conditions,
      avatarUrl:   get().avatarUrl,
    }
    const updated = { ...current, ...partial }
    saveProfile(updated)
    set(updated)
  },
})
