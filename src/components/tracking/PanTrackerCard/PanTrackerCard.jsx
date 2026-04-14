/**
 * PanTrackerCard — Card individual do Pan Tracker
 * CircularGauge + título + PercentSlider + descrição
 */

import { Bone, Zap, Heart, Fingerprint } from 'lucide-react'
import { CircularGauge }  from '../../ui/CircularGauge'
import { PercentSlider }  from '../../ui/PercentSlider'
import styles             from './PanTrackerCard.module.css'

const ICONS = {
  Bone:        <Bone size={22} />,
  Zap:         <Zap size={22} />,
  Heart:       <Heart size={22} />,
  Fingerprint: <Fingerprint size={22} />,
}

/**
 * @param {{
 *   module: { id, label, description, icon, metric },
 *   value: number,
 *   onChange: (id: string, value: number) => void,
 * }} props
 */
export function PanTrackerCard({ module: mod, value, onChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.gaugeWrapper}>
        <CircularGauge
          value={value}
          moduleId={mod.id}
          icon={ICONS[mod.icon]}
          size={80}
        />
      </div>

      <div className={styles.body}>
        <p className={styles.description}>{mod.description}</p>
        <PercentSlider
          value={value}
          onChange={v => onChange(mod.id, v)}
          moduleId={mod.id}
        />
      </div>
    </div>
  )
}
