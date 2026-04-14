/**
 * TopNav — Navegação superior com 4 abas principais
 */

import { NavLink } from 'react-router-dom'
import styles      from './TopNav.module.css'

const TABS = [
  { to: '/registro',      label: 'Registro Diário' },
  { to: '/consultas',     label: 'Consultas' },
  { to: '/recomendacoes', label: 'Recomendações' },
  { to: '/medicamentos',  label: 'Medicamentos' },
]

export function TopNav() {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <div className={styles.track}>
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.active : ''}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
