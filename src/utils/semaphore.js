/**
 * semaphore.js — Lógica de cores do sistema semáforo
 * Baseado em valores de métricas de saúde crônica
 */

const THRESHOLDS = {
  pain:      { green: [0, 3],   yellow: [4, 6],  red: [7, 10] },
  energy:    { green: [7, 10],  yellow: [4, 6],  red: [0, 3]  }, // invertido
  heartRate: { green: [60, 100],yellow: [50, 59],red: [0, 49] },
  trigger:   { green: [0, 0],   yellow: [1, 2],  red: [3, 10] },
  // Percentual (0-100) mapeado para 0-10 internamente
  percent:   { green: [70, 100],yellow: [40, 69],red: [0, 39] },
}

/**
 * getSemaphoreColor — Retorna a cor semáforo baseada em valor e tipo de métrica
 * @param {number} value — Valor medido
 * @param {'pain'|'energy'|'heartRate'|'trigger'|'percent'} metric
 * @returns {'green'|'yellow'|'red'}
 */
export function getSemaphoreColor(value, metric) {
  const t = THRESHOLDS[metric]
  if (!t) return 'yellow'
  if (value >= t.green[0]  && value <= t.green[1])  return 'green'
  if (value >= t.yellow[0] && value <= t.yellow[1]) return 'yellow'
  return 'red'
}

/**
 * percentToSemaphore — Converte valor percentual (0-100) em cor semáforo
 * Para uso nos sliders do Pan Tracker
 * @param {number} percent — 0 a 100
 * @param {'joints'|'energy'|'heartRate'|'sensitivity'} moduleId
 * @returns {'green'|'yellow'|'red'}
 */
export function percentToSemaphore(percent, moduleId) {
  // Articulações e sensibilidade: maior = pior (como pain)
  if (moduleId === 'joints' || moduleId === 'sensitivity') {
    if (percent <= 30) return 'green'
    if (percent <= 60) return 'yellow'
    return 'red'
  }
  // Energia/disposição: maior = melhor
  if (moduleId === 'energy') {
    if (percent >= 70) return 'green'
    if (percent >= 40) return 'yellow'
    return 'red'
  }
  // Cardíaco: zona média é melhor
  if (moduleId === 'heartRate') {
    if (percent >= 40 && percent <= 80) return 'green'
    if (percent >= 20 && percent <= 90) return 'yellow'
    return 'red'
  }
  return 'yellow'
}

/**
 * getDailyStatus — Calcula o status geral do dia
 * Regra: pior valor entre todos os módulos ativos
 * @param {Object} checkInData — {moduleId: percentValue}
 * @returns {'none'|'green'|'yellow'|'red'}
 */
export function getDailyStatus(checkInData) {
  if (!checkInData || Object.keys(checkInData).length === 0) return 'none'

  const colors = Object.entries(checkInData).map(([moduleId, value]) =>
    percentToSemaphore(value, moduleId)
  )
  if (colors.includes('red'))    return 'red'
  if (colors.includes('yellow')) return 'yellow'
  return 'green'
}

/** semaphoreToColor — Retorna a CSS variable de cor para o status */
export function semaphoreToColor(status) {
  const map = {
    green:  'var(--color-green)',
    yellow: 'var(--color-yellow)',
    red:    'var(--color-red)',
    none:   'var(--color-text-muted)',
  }
  return map[status] ?? map.none
}
