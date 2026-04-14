/**
 * Login — Tela de login simplificada
 */

import { useState }  from 'react'
import { Link }      from 'react-router-dom'
import { useAuth }   from '../hooks/useAuth'
import styles        from './Login.module.css'

export function Login() {
  const { handleLogin } = useAuth()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const ok = handleLogin(email.trim().toLowerCase(), password)
    if (!ok) setError('E-mail ou senha incorretos.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoPlus}>+</span>
          <span className={styles.logoText}>arion</span>
        </div>

        <h1 className={styles.title}>Bem-vinda de volta</h1>
        <p className={styles.subtitle}>Continue monitorando sua saúde</p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <input
            type="email"
            placeholder="E-MAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            className={styles.input}
            aria-label="E-mail"
          />
          <input
            type="password"
            placeholder="SENHA"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            className={styles.input}
            aria-label="Senha"
          />

          {error && <p className={styles.error} role="alert">{error}</p>}

          <button type="submit" className={styles.submitBtn}>
            Entrar
          </button>
        </form>

        <p className={styles.registerLink}>
          NÃO TEM CONTA?{' '}
          <Link to="/register" className={styles.registerAnchor}>CADASTRE-SE</Link>
        </p>
      </div>
    </div>
  )
}
