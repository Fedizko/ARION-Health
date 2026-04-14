/**
 * BadgeGrid — Grade de conquistas desbloqueadas
 */

import { ArianStar } from '../../ui/ArianStar'
import { useStreak } from '../../../hooks/useStreak'
import styles        from './BadgeGrid.module.css'

const BADGES = [
  { id: 'first',  label: 'Primeiro Registro', threshold: 1,  icon: '🌱' },
  { id: 'silver', label: 'Estrela Prata',      threshold: 5,  icon: 'star-silver' },
  { id: 'week',   label: 'Uma Semana',          threshold: 7,  icon: '🗓️' },
  { id: 'gold',   label: 'Estrela Dourada',     threshold: 30, icon: 'star-gold' },
]

export function BadgeGrid({ totalCheckIns = 0 }) {
  const { streak } = useStreak()

  return (
    <div className={styles.grid}>
      {BADGES.map(badge => {
        const unlocked = (badge.id === 'first' ? totalCheckIns : streak) >= badge.threshold
        return (
          <div
            key={badge.id}
            className={`${styles.badge} ${unlocked ? styles.unlocked : styles.locked}`}
            title={unlocked ? badge.label : `${badge.threshold} dias para desbloquear`}
            aria-label={`${badge.label} — ${unlocked ? 'Desbloqueado' : 'Bloqueado'}`}
          >
            <div className={styles.icon}>
              {badge.icon === 'star-silver' ? (
                <ArianStar status={unlocked ? 'ARION_SILVER' : 'none'} size={24} />
              ) : badge.icon === 'star-gold' ? (
                <ArianStar status={unlocked ? 'ARION_GOLD' : 'none'} size={24} />
              ) : (
                <span className={styles.emoji}>{badge.icon}</span>
              )}
            </div>
            <span className={styles.label}>{badge.label}</span>
            {!unlocked && (
              <span className={styles.threshold}>{badge.threshold}d</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
