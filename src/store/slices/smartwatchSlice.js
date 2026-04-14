/**
 * smartwatchSlice — Mock de estado do smartwatch
 */

export const createSmartwatchSlice = (set) => ({
  connected:     false,
  heartRateLive: 72,

  setConnected:     (connected)     => set({ connected }),
  setHeartRateLive: (heartRateLive) => set({ heartRateLive }),
})
