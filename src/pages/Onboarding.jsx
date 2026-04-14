/**
 * Onboarding — Fluxo de 3 passos com preferências de acessibilidade
 */

import { useState }         from 'react'
import { useNavigate }      from 'react-router-dom'
import { useStore }         from '../store/useStore'
import { ProgressStepper }  from '../components/ui/ProgressStepper'
import styles               from './Onboarding.module.css'

const STEPS = [
  {
    title:    'Bem-vinda à Arion',
    content:  'Seu companheiro de saúde para dias difíceis e dias bons.',
  },
  {
    title:    'Seus módulos de saúde',
    content:  'Articulações, energia, coração e sensibilidade — tudo em um só lugar.',
  },
  {
    title:    'Como podemos deixar sua leitura mais confortável?',
    isPreferences: true,
  },
]

export function Onboarding() {
  const navigate         = useNavigate()
  const setAccessibility = useStore(s => s.setAccessibility)

  const [step, setStep]   = useState(0)
  const [prefs, setPrefs] = useState({
    highContrast: false,
    largerText:   false,
    simplifiedUI: false,
  })

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      setAccessibility(prefs)
      navigate('/registro')
    }
  }

  const current = STEPS[step]

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <span className={styles.logoPlus}>+</span>arion
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>onboarding</h2>

        <ProgressStepper steps={STEPS.length} current={step} />

        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>{current.title}</h3>

          {current.isPreferences ? (
            <div className={styles.preferences}>
              <button
                className={`${styles.prefOption} ${prefs.highContrast ? styles.selected : ''}`}
                onClick={() => togglePref('highContrast')}
                aria-pressed={prefs.highContrast}
              >
                <span className={styles.prefTitle}>Modo de Alto Contraste</span>
                <span className={styles.prefSub}>(O seu Dark Mode já ajuda muito aqui!)</span>
              </button>

              <button
                className={`${styles.prefOption} ${prefs.largerText ? styles.selected : ''}`}
                onClick={() => togglePref('largerText')}
                aria-pressed={prefs.largerText}
              >
                <span className={styles.prefTitle}>Textos Maiores</span>
              </button>

              <button
                className={`${styles.prefOption} ${prefs.simplifiedUI ? styles.selected : ''}`}
                onClick={() => togglePref('simplifiedUI')}
                aria-pressed={prefs.simplifiedUI}
              >
                <span className={styles.prefTitle}>Interface Simplificada</span>
                <span className={styles.prefSub}>(Menos informações por tela)</span>
              </button>
            </div>
          ) : (
            <p className={styles.stepDesc}>{current.content}</p>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.skipBtn}
          onClick={() => navigate('/registro')}
        >
          Pular para o Dashboard
        </button>

        <button className={styles.nextBtn} onClick={handleNext}>
          {step === STEPS.length - 1 ? 'Começar' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}
