/**
 * AnnotationsTracker — Sub-tab de anotações (texto, humor, foto, áudio)
 */

import { useRef }        from 'react'
import { Camera, Mic }   from 'lucide-react'
import { MoodPicker }    from '../../ui/MoodPicker'
import { useStore }      from '../../../store/useStore'
import styles            from './AnnotationsTracker.module.css'

export function AnnotationsTracker() {
  const draft        = useStore(s => s.draft)
  const setDraftField = useStore(s => s.setDraftField)
  const fileInputRef  = useRef(null)

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setDraftField('photoUrl', url)
  }

  const handleAudio = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Gravação de áudio não disponível neste dispositivo.')
      return
    }
    // Indicar que gravação seria iniciada (MVP — sem implementação completa de MediaRecorder)
    alert('Funcionalidade de áudio em desenvolvimento.')
  }

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <h4 className={styles.sectionTitle}>Registro aqui por texto</h4>
        <textarea
          className={styles.textarea}
          placeholder="Digite aqui..."
          value={draft.notes ?? ''}
          onChange={e => setDraftField('notes', e.target.value)}
          rows={6}
          aria-label="Anotações do dia"
        />
      </div>

      <div className={styles.right}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Registro de humor</h4>
          <MoodPicker
            value={draft.mood}
            onChange={v => setDraftField('mood', v)}
          />
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Anexar fotos</h4>
          <button
            className={styles.mediaBtn}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Enviar foto"
          >
            <Camera size={20} />
            <span>Enviar foto</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className={styles.hiddenInput}
            aria-hidden="true"
            tabIndex={-1}
          />
          {draft.photoUrl && (
            <img src={draft.photoUrl} alt="Foto selecionada" className={styles.photoPreview} />
          )}
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Registre por áudio</h4>
          <button
            className={styles.mediaBtn}
            onClick={handleAudio}
            aria-label="Gravar áudio"
          >
            <Mic size={20} />
            <span>Gravar áudio</span>
          </button>
        </div>
      </div>
    </div>
  )
}
