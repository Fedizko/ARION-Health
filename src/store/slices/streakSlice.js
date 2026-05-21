/**
 * streakSlice — Cálculo de streak (consulta check_ins do Supabase).
 */

import { calculateStreak }                  from '../../utils/gamification'
import { getCheckInDates, saveStreakCache } from '../../utils/persistence'

export const createStreakSlice = (set) => ({
  streak:       0,
  streakStatus: 'none',

  computeStreak: async () => {
    const dates  = await getCheckInDates()
    const result = calculateStreak(dates)
    saveStreakCache(result)
    set({ streak: result.streak, streakStatus: result.status })
  },
})
