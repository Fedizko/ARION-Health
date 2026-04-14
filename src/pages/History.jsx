/**
 * History — Histórico de check-ins com gráficos Recharts
 * Carregado com lazy loading para não impactar o bundle inicial
 */

import { Suspense, lazy } from 'react'
import { useStore }       from '../store/useStore'
import { StreakCounter }  from '../components/gamification/StreakCounter'
import { BadgeGrid }      from '../components/gamification/BadgeGrid'
import styles             from './History.module.css'

const Charts = lazy(() => import('./HistoryCharts'))

export function History() {
  const checkIns = useStore(s => s.checkIns)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Histórico</h2>
        <p className={styles.subtitle}>{checkIns.length} registro{checkIns.length !== 1 ? 's' : ''} total</p>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Streak</h3>
        <StreakCounter />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Conquistas</h3>
        <BadgeGrid totalCheckIns={checkIns.length} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Evolução</h3>
        <Suspense fallback={<div className={styles.loading}>Carregando gráficos...</div>}>
          {checkIns.length > 0
            ? <Charts data={checkIns} />
            : <p className={styles.empty}>Faça seu primeiro registro para ver os gráficos.</p>
          }
        </Suspense>
      </section>
    </div>
  )
}
