/**
 * authSlice — Sessão do usuário via Supabase Auth (email + senha).
 */

import { supabase } from '../../lib/supabase'

export const createAuthSlice = (set, get) => ({
  user:            null,
  isAuthenticated: false,
  authReady:       false,

  /** Inicializa a partir da sessão persistida do Supabase e registra listener. */
  initAuth: async () => {
    const { data } = await supabase.auth.getSession()
    const session  = data?.session ?? null
    set({
      user:            session?.user ? toUser(session.user) : null,
      isAuthenticated: !!session,
      authReady:       true,
    })

    supabase.auth.onAuthStateChange((_event, newSession) => {
      set({
        user:            newSession?.user ? toUser(newSession.user) : null,
        isAuthenticated: !!newSession,
        authReady:       true,
      })
    })
  },

  /** Cadastra novo usuário. */
  register: async ({ email, password, displayName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (error) return { ok: false, error: error.message }
    const user = data?.user ? toUser(data.user) : null
    set({ user, isAuthenticated: !!data?.session })
    return { ok: true, user, needsConfirmation: !data.session }
  },

  /** Login com email/senha. */
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, error: error.message }
    set({ user: toUser(data.user), isAuthenticated: true })
    return { ok: true }
  },

  /** Logout. */
  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, isAuthenticated: false })
  },

  /** Atualiza metadata do usuário em auth.users (não confundir com profiles). */
  updateUser: async (partial) => {
    const { data, error } = await supabase.auth.updateUser({ data: partial })
    if (error) return false
    set({ user: toUser(data.user) })
    return true
  },
})

function toUser(authUser) {
  return {
    id:          authUser.id,
    email:       authUser.email,
    displayName: authUser.user_metadata?.display_name ?? '',
  }
}
