/**
 * Registro — Tela principal de registro diário
 * Sub-tabs: Pan Tracker | Sintomas | Anotações
 */

import { Share2, Calendar, PenLine, Settings } from 'lucide-react'
import { SubTabNav }         from '../components/layout/SubTabNav'
import { PanTrackerCard }    from '../components/tracking/PanTrackerCard'
import { SymptomsTracker }   from '../components/tracking/SymptomsTracker'
import { AnnotationsTracker } from '../components/tracking/AnnotationsTracker'
import { useStore }          from '../store/useStore'
import { PAN_TRACKER_MODULES } from '../utils/constants'
import styles                from './Registro.module.css'

export function Registro() {
  const activeSubTab  = useStore(s => s.activeSubTab)
  const draft         = useStore(s => s.draft)
  const setDraftField  = useStore(s => s.setDraftField)
  const submitCheckIn = useStore(s => s.submitCheckIn)
  const isSubmitting  = useStore(s => s.isSubmitting)
  const todayCheckIn  = useStore(s => s.todayCheckIn)

  const handleSliderChange = (id, value) => {
    setDraftField(id, value)
  }

  const handleSubmit = () => {
    submitCheckIn()
  }

  const pageTitle = activeSubTab === 'anotacoes'
    ? 'Conte para mim!'
    : 'Como você está agora?'

  return (
    <div className={styles.page}>
      {/* Cabeçalho da página */}
      <div className={styles.pageHeader}>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.actionIcons}>
            <button className={styles.iconBtn} aria-label="Compartilhar">
              <Share2 size={18} />
            </button>
            <button className={styles.iconBtn} aria-label="Calendário">
              <Calendar size={18} />
            </button>
            <button className={styles.iconBtn} aria-label="Editar">
              <PenLine size={18} />
            </button>
            <button className={styles.iconBtn} aria-label="Configurações">
              <Settings size={18} />
            </button>
          </div>
        </div>

        <SubTabNav />
      </div>

      {/* Conteúdo da sub-tab */}
      <div className={styles.content}>
        {activeSubTab === 'pantracker' && (
          <div className={styles.panTrackerContainer}>
            <div className={styles.grid}>
              {PAN_TRACKER_MODULES.map(mod => (
                <PanTrackerCard
                  key={mod.id}
                  module={mod}
                  value={draft[mod.id] ?? 50}
                  onChange={handleSliderChange}
                />
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'sintomas' && (
          <SymptomsTracker />
        )}

        {activeSubTab === 'anotacoes' && (
          <AnnotationsTracker />
        )}
      </div>

      {/* Botão de registrar */}
      <div className={styles.footer}>
        {todayCheckIn && (
          <p className={styles.registeredNote}>
            ✓ Registrado hoje às{' '}
            {new Date(todayCheckIn.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
        <button
          className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </div>
    </div>
  )
}
