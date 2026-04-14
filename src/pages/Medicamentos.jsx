/**
 * Medicamentos — Controle de medicamentos (MVP: placeholder)
 */

import { Pill, Plus } from 'lucide-react'
import styles from './Placeholder.module.css'

export function Medicamentos() {
  return (
    <div className={styles.page}>
      <div className={styles.icon}><Pill size={48} color="var(--color-accent)" /></div>
      <h2 className={styles.title}>Medicamentos</h2>
      <p className={styles.desc}>
        Registre seus medicamentos e nunca perca uma dose novamente.
      </p>
      <button className={styles.cta}>
        <Plus size={18} />
        <span>Adicionar medicamento</span>
      </button>
      <span className={styles.soon}>Em breve</span>
    </div>
  )
}
