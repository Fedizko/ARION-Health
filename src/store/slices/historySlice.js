/**
 * historySlice — Lista de check-ins do usuário (origem: Supabase).
 */

import { getCheckIns } from '../../utils/persistence'

export const createHistorySlice = (set) => ({
  checkIns: [],

  loadCheckIns: async () => {
    const checkIns = await getCheckIns()
    set({ checkIns })
  },
})
