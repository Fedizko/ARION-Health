/**
 * accessibilitySlice — Preferências de acessibilidade do onboarding
 */

import { saveAccessibility, getAccessibility } from '../../utils/persistence'

export const createAccessibilitySlice = (set) => ({
  // Estado
  highContrast: false,
  largerText:   false,
  simplifiedUI: false,

  // Inicializar a partir do localStorage
  initAccessibility: () => {
    const prefs = getAccessibility()
    set(prefs)
    applyBodyClasses(prefs)
  },

  // Salvar preferências
  setAccessibility: (prefs) => {
    saveAccessibility(prefs)
    set(prefs)
    applyBodyClasses(prefs)
  },
})

/** Aplica classes CSS no <body> para efeito global */
function applyBodyClasses({ highContrast, largerText, simplifiedUI }) {
  document.body.classList.toggle('high-contrast', !!highContrast)
  document.body.classList.toggle('larger-text',   !!largerText)
  document.body.classList.toggle('simplified-ui', !!simplifiedUI)
}
