/**
 * ArianStar — Estrela de gamificação com animação glow
 * Exibe prata (5 dias) ou ouro (30 dias)
 */

import styles from './ArianStar.module.css'

/** @param {{ status: 'none'|'ARION_SILVER'|'ARION_GOLD', size?: number }} */
export function ArianStar({ status = 'none', size = 32 }) {
  if (status === 'none') return null

  const isGold = status === 'ARION_GOLD'

  return (
    <span
      className={`${styles.star} ${isGold ? styles.gold : styles.silver}`}
      style={{ fontSize: size }}
      role="img"
      aria-label={isGold ? 'Estrela Dourada ARION' : 'Estrela Prata ARION'}
      title={isGold ? 'ARION Gold — 30 dias!' : 'ARION Silver — 5 dias!'}
    >
      ✦
    </span>
  )
}
