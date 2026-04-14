/**
 * Recomendações — Recomendações de saúde personalizadas (MVP: placeholder)
 */

import { Sparkles } from 'lucide-react'
import styles from './Placeholder.module.css'

export function Recomendacoes() {
  return (
    <div className={styles.page}>
      <div className={styles.icon}><Sparkles size={48} color="var(--color-accent)" /></div>
      <h2 className={styles.title}>Recomendações</h2>
      <p className={styles.desc}>
        Dicas e recomendações personalizadas baseadas nos seus registros diários.
      </p>
      <span className={styles.soon}>Em breve</span>
    </div>
  )
}
