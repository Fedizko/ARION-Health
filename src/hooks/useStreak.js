/**
 * useStreak — Hook reativo para streak e status de gamificação
 */

import { useStore }        from '../store/useStore'
import { getStreakMessage } from '../utils/gamification'

export function useStreak() {
  const streak       = useStore(s => s.streak)
  const streakStatus = useStore(s => s.streakStatus)
  const computeStreak = useStore(s => s.computeStreak)

  const message = getStreakMessage(streak, streakStatus)

  return { streak, streakStatus, message, computeStreak }
}
