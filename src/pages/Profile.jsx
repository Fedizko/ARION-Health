/**
 * Profile — Perfil e configurações do usuário
 */

import { useState, useEffect } from 'react'
import { LogOut }             from 'lucide-react'
import { useAuth }            from '../hooks/useAuth'
import { useStore }           from '../store/useStore'
import { CONDITIONS }         from '../utils/constants'
import styles                 from './Profile.module.css'

export function Profile() {
  const { handleLogout }  = useAuth()
  const updateProfile     = useStore(s => s.updateProfile)
  const displayName       = useStore(s => s.displayName)
  const conditions        = useStore(s => s.conditions)
  const accessibilityState = {
    highContrast: useStore(s => s.highContrast),
    largerText:   useStore(s => s.largerText),
    simplifiedUI: useStore(s => s.simplifiedUI),
  }
  const setAccessibility = useStore(s => s.setAccessibility)

  const [name, setName] = useState(displayName)

  useEffect(() => { setName(displayName) }, [displayName])

  const toggleCondition = (id) => {
    const current = conditions ?? []
    const updated = current.includes(id)
      ? current.filter(c => c !== id)
      : [...current, id]
    updateProfile({ conditions: updated })
  }

  const saveName = () => {
    if (name.trim()) updateProfile({ displayName: name.trim() })
  }

  const togglePref = (key) => {
    setAccessibility({ ...accessibilityState, [key]: !accessibilityState[key] })
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Meu Perfil</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Nome</h3>
        <div className={styles.nameRow}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={saveName}
            className={styles.nameInput}
            aria-label="Seu nome"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Minhas condições</h3>
        <div className={styles.condGrid}>
          {CONDITIONS.map(cond => (
            <button
              key={cond.id}
              className={`${styles.condBtn} ${conditions?.includes(cond.id) ? styles.condActive : ''}`}
              onClick={() => toggleCondition(cond.id)}
              aria-pressed={conditions?.includes(cond.id)}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Acessibilidade</h3>
        {[
          { key: 'highContrast', label: 'Alto Contraste' },
          { key: 'largerText',   label: 'Textos Maiores' },
          { key: 'simplifiedUI', label: 'Interface Simplificada' },
        ].map(pref => (
          <label key={pref.key} className={styles.toggle}>
            <span className={styles.toggleLabel}>{pref.label}</span>
            <div
              className={`${styles.toggleSwitch} ${accessibilityState[pref.key] ? styles.on : ''}`}
              onClick={() => togglePref(pref.key)}
              role="switch"
              aria-checked={accessibilityState[pref.key]}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && togglePref(pref.key)}
            />
          </label>
        ))}
      </section>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        <LogOut size={18} />
        <span>Sair da conta</span>
      </button>
    </div>
  )
}
