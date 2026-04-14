/**
 * Register — Tela de cadastro com layout split (zebra + formulário)
 */

import { useState }     from 'react'
import { Link }         from 'react-router-dom'
import { useAuth }      from '../hooks/useAuth'
import styles           from './Register.module.css'

export function Register() {
  const { handleRegister } = useAuth()

  const [form, setForm] = useState({
    displayName:    '',
    email:          '',
    password:       '',
    confirmPassword:'',
    updates:        false,
  })
  const [error, setError] = useState('')

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.displayName.trim()) { setError('Informe seu nome.'); return }
    if (!form.email.includes('@')) { setError('E-mail inválido.'); return }
    if (form.password.length < 6)  { setError('Senha com mínimo 6 caracteres.'); return }
    if (form.password !== form.confirmPassword) { setError('As senhas não conferem.'); return }

    handleRegister({
      displayName: form.displayName.trim(),
      email:       form.email.trim().toLowerCase(),
      password:    form.password,
      updates:     form.updates,
    })
  }

  return (
    <div className={styles.page}>
      {/* Metade esquerda — imagem */}
      <div className={styles.imagePanel}>
        <img src="/assets/zebra.jpg" alt="Zebra — símbolo do EDS" className={styles.zebra} />
        <div className={styles.imageOverlay} />
      </div>

      {/* Metade direita — formulário */}
      <div className={styles.formPanel}>
        <div className={styles.formInner}>
          <h1 className={styles.title}>CADASTRE-SE</h1>
          <p className={styles.subtitle}>Sua jornada de cuidado começa aqui</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="NOME"
                value={form.displayName}
                onChange={e => set('displayName', e.target.value)}
                autoComplete="name"
                className={styles.input}
                aria-label="Nome completo"
              />
            </div>

            <div className={styles.field}>
              <input
                type="email"
                placeholder="E-MAIL"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                autoComplete="email"
                className={styles.input}
                aria-label="E-mail"
              />
            </div>

            <div className={styles.field}>
              <input
                type="password"
                placeholder="SENHA"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                autoComplete="new-password"
                className={styles.input}
                aria-label="Senha"
              />
            </div>

            <div className={styles.field}>
              <input
                type="password"
                placeholder="CONFIRMAR SENHA"
                value={form.confirmPassword}
                onChange={e => set('confirmPassword', e.target.value)}
                autoComplete="new-password"
                className={styles.input}
                aria-label="Confirmar senha"
              />
            </div>

            <button type="button" className={styles.photoBtn}>
              Foto de Perfil
            </button>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={form.updates}
                onChange={e => set('updates', e.target.checked)}
              />
              <span>Desejo receber atualizações da Arion</span>
            </label>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <button type="submit" className={styles.submitBtn}>
              cadastre-se
            </button>
          </form>

          <p className={styles.loginLink}>
            JÁ TEM UMA CONTA?{' '}
            <Link to="/login" className={styles.loginAnchor}>ENTRE AQUI</Link>
          </p>

          <p className={styles.legal}>
            Ao clicar em cadastre-se você está concordando com as{' '}
            <span>políticas de uso</span> e <span>políticas de privacidade</span>
          </p>
        </div>
      </div>
    </div>
  )
}
