/**
 * SubTabNav — Sub-navegação interna do Registro Diário
 */

import { useStore } from '../../../store/useStore'
import styles       from './SubTabNav.module.css'

const SUBTABS = [
  { id: 'pantracker', label: 'Pan Tracker' },
  { id: 'sintomas',   label: 'Sintomas' },
  { id: 'anotacoes',  label: 'Anotações' },
]

export function SubTabNav() {
  const activeSubTab  = useStore(s => s.activeSubTab)
  const setActiveSubTab = useStore(s => s.setActiveSubTab)

  return (
    <nav className={styles.nav} aria-label="Sub-navegação do registro">
      {SUBTABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeSubTab === tab.id ? styles.active : ''}`}
          onClick={() => setActiveSubTab(tab.id)}
          aria-current={activeSubTab === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
