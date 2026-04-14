/**
 * SemaphoreIndicator — Dot colorido de status do dia
 */

import styles from './SemaphoreIndicator.module.css'

/** @param {{ status: 'none'|'green'|'yellow'|'red', size?: 'sm'|'md'|'lg' }} */
export function SemaphoreIndicator({ status = 'none', size = 'md' }) {
  const label = {
    none:   'Sem registro',
    green:  'Bom',
    yellow: 'Atenção',
    red:    'Crítico',
  }[status]

  return (
    <span
      className={`${styles.dot} ${styles[size]} ${styles[status]}`}
      role="img"
      aria-label={`Status: ${label}`}
      title={label}
    />
  )
}
