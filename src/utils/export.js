/**
 * export.js — Geração de relatório médico via window.print()
 */

import { getCheckIns, getProfile } from './persistence'

/**
 * generateMedicalReport — Abre janela de impressão com relatório formatado
 * @param {Object} options — { days: number } — últimos N dias (padrão 30)
 */
export function generateMedicalReport({ days = 30 } = {}) {
  const profile  = getProfile() ?? {}
  const allData  = getCheckIns()
  const cutoff   = new Date()
  cutoff.setDate(cutoff.getDate() - days)

  const filtered = allData.filter(c => new Date(c.date) >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date))

  const name  = profile.displayName || 'Paciente'
  const conds = Array.isArray(profile.conditions)
    ? profile.conditions.join(', ')
    : 'Não informado'

  const rows = filtered.map(c => `
    <tr>
      <td>${formatDate(c.date)}</td>
      <td>${c.joints ?? '—'}%</td>
      <td>${c.energy ?? '—'}%</td>
      <td>${c.heartRate ?? '—'}%</td>
      <td>${c.sensitivity ?? '—'}%</td>
      <td>${Array.isArray(c.symptoms) ? c.symptoms.join(', ') : '—'}</td>
      <td>${c.mood ?? '—'}</td>
      <td>${c.notes ?? '—'}</td>
    </tr>
  `).join('')

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Relatório ARION — ${name}</title>
      <style>
        body { font-family: sans-serif; font-size: 12px; color: #000; background: #fff; }
        h1 { font-size: 20px; margin-bottom: 4px; }
        h2 { font-size: 14px; font-weight: normal; color: #444; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
        th { background: #f0f0f0; font-weight: bold; }
        .header-info { margin-bottom: 12px; }
        .header-info span { margin-right: 24px; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <h1>Relatório de Saúde — ARION Health</h1>
      <h2>Gerado em ${formatDate(new Date().toISOString().split('T')[0])} • Últimos ${days} dias</h2>
      <div class="header-info">
        <span><strong>Paciente:</strong> ${name}</span>
        <span><strong>Condições:</strong> ${conds}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Articulações</th>
            <th>Disposição</th>
            <th>Cardíaco</th>
            <th>Sensibilidade</th>
            <th>Sintomas</th>
            <th>Humor</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="8">Nenhum registro no período.</td></tr>'}
        </tbody>
      </table>
    </body>
    </html>
  `

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => win.print(), 500)
}

function formatDate(isoDate) {
  if (!isoDate) return '—'
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}
