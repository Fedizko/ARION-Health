/** Constantes globais do ARION Health */

// Gamificação
export const STREAK_THRESHOLD_SILVER = 5    // dias → Orion Star (prata)
export const STREAK_THRESHOLD_GOLD   = 30   // dias → Orion Gold

// Chaves do LocalStorage
export const STORAGE_KEYS = {
  checkIns:      'arion_check_ins',
  userProfile:   'arion_user_profile',
  settings:      'arion_settings',
  streakCache:   'arion_streak_cache',
  accessibility: 'arion_accessibility',
}

// Módulos de monitoramento do Pan Tracker
export const PAN_TRACKER_MODULES = [
  {
    id:          'joints',
    label:       'Articulações',
    description: "Avalie o quão 'firmes' sentiu as articulações no dia",
    icon:        'Bone',
    metric:      'pain',
  },
  {
    id:          'energy',
    label:       'Disposição',
    description: 'Avalie seu nível de disposição e clareza mental',
    icon:        'Zap',
    metric:      'energy',
  },
  {
    id:          'heartRate',
    label:       'Cardíaco',
    description: 'Avalie a estabilidade do seu ritmo cardíaco e pressão',
    icon:        'Heart',
    metric:      'heartRate',
  },
  {
    id:          'sensitivity',
    label:       'Sensibilidade',
    description: 'Avalie a sensibilidade do seu corpo a estímulos',
    icon:        'Fingerprint',
    metric:      'trigger',
  },
]

// Sintomas frequentes por condição
export const SYMPTOM_OPTIONS = [
  { id: 'fatigue',       label: 'Fadiga',         icon: 'Battery' },
  { id: 'brainfog',      label: 'Névoa Mental',   icon: 'CloudFog' },
  { id: 'palpitations',  label: 'Palpitações',    icon: 'HeartPulse' },
  { id: 'dizziness',     label: 'Tontura',         icon: 'Unplug' },
  { id: 'nausea',        label: 'Náusea',          icon: 'Waves' },
  { id: 'pain',          label: 'Dor',             icon: 'Flame' },
  { id: 'insomnia',      label: 'Insônia',         icon: 'MoonStar' },
  { id: 'anxiety',       label: 'Ansiedade',       icon: 'Wind' },
  { id: 'hypersensitivity', label: 'Hipersensibilidade', icon: 'Zap' },
  { id: 'subluxation',   label: 'Subluxação',      icon: 'Unlink' },
]

// Condições crónicas suportadas
export const CONDITIONS = [
  { id: 'sed',         label: 'SED — Síndrome de Ehlers-Danlos' },
  { id: 'fibro',       label: 'Fibromialgia' },
  { id: 'sama',        label: 'SAMA — Sínd. de Ativação Mastocitária' },
  { id: 'dysautonomia',label: 'Disautonomia / POTS' },
  { id: 'mecfs',       label: 'ME/CFS — Encefalomielite Miálgica' },
  { id: 'other',       label: 'Outra condição' },
]

// Opções de humor para anotações
export const MOOD_OPTIONS = [
  { id: 'sad',     emoji: '😢', label: 'Mal' },
  { id: 'neutral', emoji: '😐', label: 'Neutro' },
  { id: 'good',    emoji: '😄', label: 'Bem' },
]
