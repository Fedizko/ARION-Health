/**
 * StreakCounter — Contador de streak com ArianStar
 */

import { Flame }     from 'lucide-react'
import { ArianStar } from '../../ui/ArianStar'
import { useStreak } from '../../../hooks/useStreak'
import styles        from './StreakCounter.module.css'

export function StreakCounter() {
  const { streak, streakStatus, message } = useStreak()

  return (
    <div className={styles.counter}>
      <div className={styles.icon}>
        {streakStatus !== 'none'
          ? <ArianStar status={streakStatus} size={24} />
          : <Flame size={20} color="var(--color-text-muted)" />
        }
      </div>
      <div className={styles.info}>
        <span className={styles.days}>
          {streak} dia{streak !== 1 ? 's' : ''}
        </span>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  )
}
