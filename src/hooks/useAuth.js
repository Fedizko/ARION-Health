/**
 * useAuth — Hook de autenticação e navegação (assíncrono).
 */

import { useNavigate }  from 'react-router-dom'
import { useStore }     from '../store/useStore'

export function useAuth() {
  const navigate        = useNavigate()
  const register        = useStore(s => s.register)
  const login           = useStore(s => s.login)
  const logout          = useStore(s => s.logout)
  const isAuthenticated = useStore(s => s.isAuthenticated)

  const handleRegister = async (userData) => {
    const result = await register(userData)
    if (result.ok && !result.needsConfirmation) {
      navigate('/onboarding')
    }
    return result
  }

  const handleLogin = async (email, password) => {
    const result = await login(email, password)
    if (result.ok) navigate('/registro')
    return result
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return { handleRegister, handleLogin, handleLogout, isAuthenticated }
}
