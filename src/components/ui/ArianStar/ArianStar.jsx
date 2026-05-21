/**
 * ArianStar — Estrela de gamificação com animação glow
 * Exibe prata (5 dias) ou ouro (30 dias)
 */

import styles from './ArianStar.module.css'

/** @param {{ status: 'none'|'ARIAN_SILVER'|'ARIAN_GOLD', size?: number }} */
export function ArianStar({ status = 'none', size = 32 }) {
  if (status === 'none') return null

  const isGold = status === 'ARIAN_GOLD'

  return (
    <span
      className={`${styles.star} ${isGold ? styles.gold : styles.silver}`}
      style={{ fontSize: size }}
      role="img"
      aria-label={isGold ? 'Estrela Dourada ARIAN' : 'Estrela Prata ARIAN'}
      title={isGold ? 'ARIAN Gold — 30 dias!' : 'ARIAN Silver — 5 dias!'}
    >
      ✦
    </span>
  )
}
