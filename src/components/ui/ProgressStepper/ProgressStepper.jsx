/**
 * ProgressStepper — Indicador de passos do onboarding
 */

import styles from './ProgressStepper.module.css'

/** @param {{ steps: number, current: number }} */
export function ProgressStepper({ steps = 3, current = 0 }) {
  return (
    <div className={styles.stepper} aria-label={`Passo ${current + 1} de ${steps}`}>
      {Array.from({ length: steps }, (_, i) => {
        const done   = i < current
        const active = i === current
        return (
          <div key={i} className={styles.stepWrapper}>
            <div
              className={`${styles.circle} ${done ? styles.done : ''} ${active ? styles.active : ''}`}
              aria-current={active ? 'step' : undefined}
            >
              {done && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            {i < steps - 1 && (
              <div className={`${styles.line} ${done ? styles.lineDone : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
