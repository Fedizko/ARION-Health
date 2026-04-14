/**
 * useAuth — Hook de autenticação e navegação
 */

import { useNavigate }  from 'react-router-dom'
import { useStore }     from '../store/useStore'

export function useAuth() {
  const navigate      = useNavigate()
  const register      = useStore(s => s.register)
  const login         = useStore(s => s.login)
  const logout        = useStore(s => s.logout)
  const isAuthenticated = useStore(s => s.isAuthenticated)

  const handleRegister = (userData) => {
    register(userData)
    navigate('/onboarding')
  }

  const handleLogin = (email, password) => {
    const ok = login(email, password)
    if (ok) {
      navigate('/registro')
      return true
    }
    return false
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return { handleRegister, handleLogin, handleLogout, isAuthenticated }
}
