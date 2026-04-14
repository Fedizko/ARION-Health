/**
 * historySlice — Histórico de check-ins
 */

import { getCheckIns } from '../../utils/persistence'

export const createHistorySlice = (set) => ({
  checkIns: [],

  loadCheckIns: () => {
    const checkIns = getCheckIns()
    set({ checkIns })
  },
})
