/**
 * QuickPicker — Botões de seleção rápida one-tap (sintomas, condições, etc.)
 */

import styles from './QuickPicker.module.css'

/**
 * @param {{
 *   options: Array<{ id: string, label: string, icon?: React.ReactNode }>,
 *   selected: string[],
 *   onToggle: (id: string) => void,
 *   multi?: boolean,
 * }} props
 */
export function QuickPicker({ options = [], selected = [], onToggle, multi = true }) {
  return (
    <div className={styles.grid} role="group">
      {options.map(opt => {
        const isActive = selected.includes(opt.id)
        return (
          <button
            key={opt.id}
            className={`${styles.option} ${isActive ? styles.active : ''}`}
            onClick={() => onToggle(opt.id)}
            aria-pressed={isActive}
            aria-label={opt.label}
          >
            {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
            <span className={styles.label}>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
