/**
 * gamification.js — Motor de streak e conquistas do ARIAN Health
 */

import { STREAK_THRESHOLD_SILVER, STREAK_THRESHOLD_GOLD } from './constants'

/**
 * calculateStreak — Calcula o streak atual baseado no histórico de check-ins
 * @param {string[]} checkInDates — Array de datas ISO: ['2025-01-01', ...]
 * @returns {{ streak: number, status: 'none'|'ARIAN_SILVER'|'ARIAN_GOLD' }}
 */
export function calculateStreak(checkInDates) {
  if (!checkInDates || checkInDates.length === 0) {
    return { streak: 0, status: 'none' }
  }

  const sorted = [...checkInDates].sort().reverse()
  const today  = new Date().toISOString().split('T')[0]

  const msPerDay  = 86_400_000
  const lastDate  = new Date(sorted[0])
  const todayDate = new Date(today)
  const diffDays  = Math.floor((todayDate - lastDate) / msPerDay)

  // Streak quebrou se último check-in foi há mais de 1 dia
  if (diffDays > 1) return { streak: 0, status: 'none' }

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i])
    const curr = new Date(sorted[i - 1])
    const diff = Math.floor((curr - prev) / msPerDay)
    if (diff === 1) streak++
    else break
  }

  const status =
    streak >= STREAK_THRESHOLD_GOLD   ? 'ARIAN_GOLD'   :
    streak >= STREAK_THRESHOLD_SILVER ? 'ARIAN_SILVER' :
    'none'

  return { streak, status }
}

/**
 * getStreakMessage — Mensagem motivacional baseada no streak
 * @param {number} streak
 * @param {'none'|'ARIAN_SILVER'|'ARIAN_GOLD'} status
 * @returns {string}
 */
export function getStreakMessage(streak, status) {
  if (streak === 0)               return 'Comece seu streak hoje!'
  if (streak === 1)               return 'Primeiro dia registrado!'
  if (streak < STREAK_THRESHOLD_SILVER) {
    const remaining = STREAK_THRESHOLD_SILVER - streak
    return `${remaining} dia${remaining > 1 ? 's' : ''} para a Estrela Prata!`
  }
  if (status === 'ARIAN_SILVER' && streak < STREAK_THRESHOLD_GOLD) {
    const remaining = STREAK_THRESHOLD_GOLD - streak
    return `${remaining} dia${remaining > 1 ? 's' : ''} para a Estrela Dourada!`
  }
  if (status === 'ARIAN_GOLD') return 'Estrela Dourada conquistada!'
  return `${streak} dias seguidos!`
}
