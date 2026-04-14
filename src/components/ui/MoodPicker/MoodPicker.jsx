/**
 * MoodPicker — Seletor de humor com 3 emojis em pill container
 */

import { MOOD_OPTIONS } from '../../../utils/constants'
import styles from './MoodPicker.module.css'

/** @param {{ value: string|null, onChange: Function }} */
export function MoodPicker({ value = null, onChange }) {
  return (
    <div className={styles.container} role="group" aria-label="Selecione seu humor">
      {MOOD_OPTIONS.map(opt => (
        <button
          key={opt.id}
          className={`${styles.option} ${value === opt.id ? styles.selected : ''}`}
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
          aria-label={opt.label}
          title={opt.label}
        >
          <span className={styles.emoji}>{opt.emoji}</span>
        </button>
      ))}
    </div>
  )
}
