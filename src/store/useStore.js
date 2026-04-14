/**
 * useStore — Store Zustand central do ARION Health
 * Compõe todas as slices de domínio
 */

import { create } from 'zustand'
import { createAuthSlice }          from './slices/authSlice'
import { createAccessibilitySlice } from './slices/accessibilitySlice'
import { createCheckInSlice }       from './slices/checkInSlice'
import { createHistorySlice }       from './slices/historySlice'
import { createStreakSlice }        from './slices/streakSlice'
import { createProfileSlice }       from './slices/profileSlice'
import { createSmartwatchSlice }    from './slices/smartwatchSlice'

export const useStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createAccessibilitySlice(...a),
  ...createCheckInSlice(...a),
  ...createHistorySlice(...a),
  ...createStreakSlice(...a),
  ...createProfileSlice(...a),
  ...createSmartwatchSlice(...a),
}))
