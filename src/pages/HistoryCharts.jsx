/**
 * HistoryCharts — Chunk lazy com os gráficos Recharts
 * Importado via React.lazy() em History.jsx
 */

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import styles from './HistoryCharts.module.css'

const METRICS = [
  { key: 'joints',      name: 'Articulações', color: '#EF4444' },
  { key: 'energy',      name: 'Disposição',   color: '#22C55E' },
  { key: 'heartRate',   name: 'Cardíaco',     color: '#3B82F6' },
  { key: 'sensitivity', name: 'Sensibilidade',color: '#EAB308' },
]

function formatDate(isoDate) {
  const [, m, d] = isoDate.split('-')
  return `${d}/${m}`
}

export default function HistoryCharts({ data }) {
  const chartData = data
    .slice(-30) // últimos 30 dias
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(c => ({
      date:        formatDate(c.date),
      joints:      c.joints      ?? null,
      energy:      c.energy      ?? null,
      heartRate:   c.heartRate   ?? null,
      sensitivity: c.sensitivity ?? null,
    }))

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 4, right: 16, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#888', fontSize: 11 }}
            axisLine={{ stroke: '#2A2A2A' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#888', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: '#111', border: '1px solid #2A2A2A', borderRadius: 8 }}
            labelStyle={{ color: '#fff', fontFamily: 'DM Sans, sans-serif' }}
            itemStyle={{ fontFamily: 'DM Sans, sans-serif' }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#888' }}
          />
          {METRICS.map(m => (
            <Line
              key={m.key}
              type="monotone"
              dataKey={m.key}
              name={m.name}
              stroke={m.color}
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
