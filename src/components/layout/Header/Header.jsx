/**
 * Header — Barra superior com logo +orion e avatar do usuário
 */

import { useNavigate } from 'react-router-dom'
import { Settings, Bell, User } from 'lucide-react'
import { useStore }    from '../../../store/useStore'
import styles          from './Header.module.css'

export function Header() {
  const navigate    = useNavigate()
  const displayName = useStore(s => s.displayName)
  const avatarUrl   = useStore(s => s.avatarUrl)

  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'A'

  return (
    <header className={styles.header}>
      <button
        className={styles.logo}
        onClick={() => navigate('/registro')}
        aria-label="Ir para início"
      >
        <span className={styles.logoPlus}>+</span>arion
      </button>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notificações">
          <Bell size={20} />
        </button>
        <button
          className={styles.iconBtn}
          onClick={() => navigate('/profile')}
          aria-label="Configurações"
        >
          <Settings size={20} />
        </button>
        <button
          className={styles.avatar}
          onClick={() => navigate('/profile')}
          aria-label="Perfil"
        >
          {avatarUrl
            ? <img src={avatarUrl} alt="Avatar" className={styles.avatarImg} />
            : <span className={styles.avatarInitials}>{initials}</span>
          }
        </button>
      </div>
    </header>
  )
}
