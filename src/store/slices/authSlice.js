/**
 * authSlice — Estado de autenticação e sessão do usuário
 */

import { saveUser, getUser } from '../../utils/persistence'

export const createAuthSlice = (set, get) => ({
  // Estado
  user:            null,
  isAuthenticated: false,

  // Inicializar a partir do localStorage
  initAuth: () => {
    const stored = getUser()
    if (stored?.email) {
      set({ user: stored, isAuthenticated: true })
    }
  },

  // Registrar novo usuário
  register: (userData) => {
    const user = { ...userData, createdAt: Date.now() }
    saveUser(user)
    set({ user, isAuthenticated: true })
  },

  // Login de usuário existente
  login: (email, password) => {
    const stored = getUser()
    if (!stored) return false
    if (stored.email === email && stored.password === password) {
      set({ user: stored, isAuthenticated: true })
      return true
    }
    return false
  },

  // Logout
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  // Atualizar dados do usuário
  updateUser: (partial) => {
    const current = get().user ?? {}
    const updated = { ...current, ...partial }
    saveUser(updated)
    set({ user: updated })
  },
})
