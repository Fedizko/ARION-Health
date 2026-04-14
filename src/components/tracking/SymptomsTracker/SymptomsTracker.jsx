/**
 * SymptomsTracker — Seletor de sintomas por QuickPicker
 */

import {
  Battery, BrainCircuit, HeartPulse, Waves,
  Flame, MoonStar, Wind, Zap,
} from 'lucide-react'
import { QuickPicker }   from '../../ui/QuickPicker'
import { SYMPTOM_OPTIONS } from '../../../utils/constants'
import { useStore }      from '../../../store/useStore'
import styles            from './SymptomsTracker.module.css'

const ICON_MAP = {
  Battery:    <Battery size={16} />,
  CloudFog:   <BrainCircuit size={16} />,
  HeartPulse: <HeartPulse size={16} />,
  Unplug:     <Waves size={16} />,
  Waves:      <Waves size={16} />,
  Flame:      <Flame size={16} />,
  MoonStar:   <MoonStar size={16} />,
  Wind:       <Wind size={16} />,
  Zap:        <Zap size={16} />,
  Unlink:     <Zap size={16} />,
}

export function SymptomsTracker() {
  const draft         = useStore(s => s.draft)
  const toggleSymptom = useStore(s => s.toggleSymptom)

  const optionsWithIcons = SYMPTOM_OPTIONS.map(opt => ({
    ...opt,
    icon: ICON_MAP[opt.icon],
  }))

  return (
    <div className={styles.wrapper}>
      <p className={styles.hint}>Selecione os sintomas de hoje</p>
      <QuickPicker
        options={optionsWithIcons}
        selected={draft.symptoms ?? []}
        onToggle={toggleSymptom}
        multi
      />
    </div>
  )
}
