/**
 * checkInSlice — Estado da sessão de check-in do dia.
 */

import { saveCheckIn, getTodayCheckIn } from '../../utils/persistence'
import { getDailyStatus }               from '../../utils/semaphore'

const DEFAULT_VALUES = {
  joints:      50,
  energy:      50,
  heartRate:   50,
  sensitivity: 50,
  symptoms:    [],
  mood:        null,
  notes:       '',
}

export const createCheckInSlice = (set, get) => ({
  draft:        { ...DEFAULT_VALUES },
  isSubmitting: false,
  submitError:  null,
  todayCheckIn: null,
  dailyStatus:  'none',
  activeSubTab: 'pantracker',

  initCheckIn: async () => {
    const today = await getTodayCheckIn()
    if (today) {
      set({
        todayCheckIn: today,
        draft: { ...DEFAULT_VALUES, ...today },
        dailyStatus: getDailyStatus(today),
      })
    } else {
      set({
        todayCheckIn: null,
        draft: { ...DEFAULT_VALUES },
        dailyStatus: 'none',
      })
    }
  },

  setDraftField: (field, value) => {
    set(state => {
      const draft = { ...state.draft, [field]: value }
      return { draft, dailyStatus: getDailyStatus(draft) }
    })
  },

  toggleSymptom: (symptomId) => {
    set(state => {
      const symptoms = state.draft.symptoms ?? []
      const updated  = symptoms.includes(symptomId)
        ? symptoms.filter(s => s !== symptomId)
        : [...symptoms, symptomId]
      return { draft: { ...state.draft, symptoms: updated } }
    })
  },

  submitCheckIn: async () => {
    set({ isSubmitting: true, submitError: null })
    try {
      const draft = get().draft
      const saved = await saveCheckIn(draft)
      if (!saved) {
        set({ isSubmitting: false, submitError: 'Falha ao salvar check-in.' })
        return false
      }
      set({
        todayCheckIn: saved,
        isSubmitting: false,
        dailyStatus:  getDailyStatus(saved),
      })
      await get().computeStreak?.()
      await get().loadCheckIns?.()
      return true
    } catch (err) {
      set({ isSubmitting: false, submitError: err.message })
      return false
    }
  },

  setActiveSubTab: (tab) => set({ activeSubTab: tab }),
})
