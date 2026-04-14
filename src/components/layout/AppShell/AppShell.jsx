/**
 * AppShell — Wrapper principal do app autenticado
 * Inicializa o store e aplica preferências de acessibilidade
 */

import { useEffect } from 'react'
import { Outlet }    from 'react-router-dom'
import { useStore }  from '../../../store/useStore'
import { Header }    from '../Header'
import { TopNav }    from '../TopNav'
import styles        from './AppShell.module.css'

export function AppShell() {
  const initAuth          = useStore(s => s.initAuth)
  const initAccessibility = useStore(s => s.initAccessibility)
  const initProfile       = useStore(s => s.initProfile)
  const initCheckIn       = useStore(s => s.initCheckIn)
  const loadCheckIns      = useStore(s => s.loadCheckIns)
  const computeStreak     = useStore(s => s.computeStreak)

  useEffect(() => {
    initAuth()
    initAccessibility()
    initProfile()
    initCheckIn()
    loadCheckIns()
    computeStreak()
  }, [])

  return (
    <div className={styles.shell}>
      <Header />
      <TopNav />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
