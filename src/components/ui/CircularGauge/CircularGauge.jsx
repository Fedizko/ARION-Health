/**
 * CircularGauge — Gauge semicircular SVG com ícone central
 * Usado nos cards do Pan Tracker
 */

import { percentToSemaphore } from '../../../utils/semaphore'
import styles from './CircularGauge.module.css'

const SIZE     = 80
const STROKE   = 8
const R        = (SIZE - STROKE) / 2
const CIRC     = 2 * Math.PI * R
// Arco de 180° (semicírculo) — usamos apenas metade da circunferência
const ARC_LEN  = CIRC / 2

/**
 * @param {{
 *   value: number,        — 0 a 100
 *   moduleId: string,     — para calcular cor semáforo
 *   icon: React.ReactNode,
 *   size?: number,
 * }} props
 */
export function CircularGauge({ value = 50, moduleId = 'energy', icon, size = SIZE }) {
  const status    = percentToSemaphore(value, moduleId)
  const colorMap  = {
    green:  'var(--color-green)',
    yellow: 'var(--color-yellow)',
    red:    'var(--color-red)',
  }
  const color    = colorMap[status] ?? colorMap.green
  const progress = Math.max(0, Math.min(100, value)) / 100

  // stroke-dashoffset: 0 = cheio, ARC_LEN = vazio
  const offset   = ARC_LEN * (1 - progress)

  // Rotação: começa do centro-esquerda (180°) e vai até centro-direita
  const cx = size / 2
  const cy = size / 2
  const r  = (size - STROKE) / 2

  return (
    <div
      className={styles.wrapper}
      style={{ width: size, height: size / 2 + 4 }}
      aria-label={`${Math.round(value)}%`}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
        style={{ marginTop: -(size / 2) }}
      >
        {/* Track (fundo) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--color-bg-raised)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${ARC_LEN} ${CIRC}`}
          strokeDashoffset={0}
          transform={`rotate(180 ${cx} ${cy})`}
        />
        {/* Progresso */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${ARC_LEN} ${CIRC}`}
          strokeDashoffset={offset}
          transform={`rotate(180 ${cx} ${cy})`}
          style={{ transition: `stroke-dashoffset ${300}ms ease, stroke 300ms ease` }}
        />
      </svg>

      {/* Ícone central */}
      {icon && (
        <div className={styles.icon} style={{ color }}>
          {icon}
        </div>
      )}
    </div>
  )
}
