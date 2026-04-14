/**
 * checkInSlice — Estado da sessão de check-in do dia
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
  // Estado de check-in em andamento
  draft:       { ...DEFAULT_VALUES },
  isSubmitting: false,
  submitError:  null,
  todayCheckIn: null,
  dailyStatus:  'none',
  activeSubTab: 'pantracker',

  // Inicializar com dados do dia
  initCheckIn: () => {
    const today = getTodayCheckIn()
    if (today) {
      set({
        todayCheckIn: today,
        draft: { ...DEFAULT_VALUES, ...today },
        dailyStatus: getDailyStatus(today),
      })
    }
  },

  // Atualizar campo do draft
  setDraftField: (field, value) => {
    set(state => {
      const draft = { ...state.draft, [field]: value }
      return { draft, dailyStatus: getDailyStatus(draft) }
    })
  },

  // Alternar sintoma no draft
  toggleSymptom: (symptomId) => {
    set(state => {
      const symptoms = state.draft.symptoms ?? []
      const updated  = symptoms.includes(symptomId)
        ? symptoms.filter(s => s !== symptomId)
        : [...symptoms, symptomId]
      return { draft: { ...state.draft, symptoms: updated } }
    })
  },

  // Submeter check-in
  submitCheckIn: () => {
    set({ isSubmitting: true, submitError: null })
    try {
      const draft = get().draft
      saveCheckIn(draft)
      set({
        todayCheckIn: { ...draft, date: new Date().toISOString().split('T')[0] },
        isSubmitting: false,
        dailyStatus:  getDailyStatus(draft),
      })
      // Disparar recálculo do streak
      get().computeStreak?.()
      get().loadCheckIns?.()
      return true
    } catch (err) {
      set({ isSubmitting: false, submitError: err.message })
      return false
    }
  },

  // Trocar sub-tab ativa
  setActiveSubTab: (tab) => set({ activeSubTab: tab }),
})
