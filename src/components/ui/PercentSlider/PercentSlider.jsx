/**
 * PercentSlider — Slider 0→100% com marcas visuais e cor semáforo
 */

import { percentToSemaphore } from '../../../utils/semaphore'
import styles from './PercentSlider.module.css'

/**
 * @param {{
 *   value: number,       — 0 a 100
 *   onChange: Function,
 *   moduleId?: string,
 *   label?: string,
 * }} props
 */
export function PercentSlider({ value = 50, onChange, moduleId = 'energy', label }) {
  const status   = percentToSemaphore(value, moduleId)
  const colorMap = {
    green:  'var(--color-green)',
    yellow: 'var(--color-yellow)',
    red:    'var(--color-red)',
  }
  const color = colorMap[status]

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className={styles.slider}
          style={{ '--thumb-color': color, '--fill-pct': `${value}%`, '--fill-color': color }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? 'Valor percentual'}
        />
        <div className={styles.marks}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <span className={styles.value} style={{ color }}>
        {value}%
      </span>
    </div>
  )
}
