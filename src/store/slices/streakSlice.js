/**
 * streakSlice — Gamificação e cálculo de streak
 */

import { calculateStreak }                    from '../../utils/gamification'
import { getCheckInDates, saveStreakCache }    from '../../utils/persistence'

export const createStreakSlice = (set) => ({
  streak:       0,
  streakStatus: 'none',

  computeStreak: () => {
    const dates  = getCheckInDates()
    const result = calculateStreak(dates)
    saveStreakCache(result)
    set({ streak: result.streak, streakStatus: result.status })
  },
})
