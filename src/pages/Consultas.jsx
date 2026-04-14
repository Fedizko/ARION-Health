/**
 * Consultas — Gestão de consultas médicas (MVP: placeholder)
 */

import { Calendar, Plus } from 'lucide-react'
import styles from './Placeholder.module.css'

export function Consultas() {
  return (
    <div className={styles.page}>
      <div className={styles.icon}><Calendar size={48} color="var(--color-accent)" /></div>
      <h2 className={styles.title}>Consultas</h2>
      <p className={styles.desc}>
        Gerencie suas consultas médicas e acompanhe seus próximos agendamentos.
      </p>
      <button className={styles.cta}>
        <Plus size={18} />
        <span>Adicionar consulta</span>
      </button>
      <span className={styles.soon}>Em breve</span>
    </div>
  )
}
