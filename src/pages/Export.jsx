/**
 * Export — Geração de relatório médico para impressão
 */

import { FileText, Printer } from 'lucide-react'
import { generateMedicalReport } from '../utils/export'
import { useStore } from '../store/useStore'
import styles from './Export.module.css'

export function Export() {
  const checkIns    = useStore(s => s.checkIns)
  const displayName = useStore(s => s.displayName)

  const handlePrint = (days) => {
    generateMedicalReport({ days })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <FileText size={32} color="var(--color-accent)" />
        <h2 className={styles.title}>Relatório Médico</h2>
        <p className={styles.subtitle}>
          Gere um relatório para compartilhar com seu médico
        </p>
      </div>

      <div className={styles.info}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{checkIns.length}</span>
          <span className={styles.statLabel}>Registros totais</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{displayName || 'Paciente'}</span>
          <span className={styles.statLabel}>Paciente</span>
        </div>
      </div>

      <div className={styles.options}>
        <p className={styles.optionsTitle}>Selecione o período:</p>

        {[7, 30, 90].map(days => (
          <button
            key={days}
            className={styles.exportBtn}
            onClick={() => handlePrint(days)}
          >
            <Printer size={18} />
            <span>Últimos {days} dias</span>
          </button>
        ))}
      </div>

      <p className={styles.note}>
        O relatório será aberto em uma nova janela para impressão.
        Salve como PDF para enviar digitalmente.
      </p>
    </div>
  )
}
