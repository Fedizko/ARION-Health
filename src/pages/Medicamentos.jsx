/**
 * Medicamentos — CRUD de medicamentos do usuário com log de tomadas.
 */

import { useEffect, useState } from 'react'
import { Pill, Plus, Trash2, Check } from 'lucide-react'
import {
  getMedications,
  createMedication,
  deleteMedication,
  logMedicationTaken,
} from '../utils/persistence'
import styles from './Medicamentos.module.css'

export function Medicamentos() {
  const [meds,    setMeds]    = useState([])
  const [loading, setLoading] = useState(true)
  const [adding,  setAdding]  = useState(false)
  const [form,    setForm]    = useState({ name: '', dosage: '', schedule: '' })
  const [savingId, setSavingId] = useState(null)
  const [error,   setError]   = useState('')

  const refresh = async () => {
    setLoading(true)
    const list = await getMedications()
    setMeds(list)
    setLoading(false)
  }

  useEffect(() => { refresh() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Informe o nome do medicamento.'); return }
    const created = await createMedication({
      name: form.name.trim(),
      dosage: form.dosage.trim(),
      schedule: form.schedule.trim(),
    })
    if (!created) { setError('Não foi possível salvar.'); return }
    setForm({ name: '', dosage: '', schedule: '' })
    setAdding(false)
    await refresh()
  }

  const handleDelete = async (id) => {
    if (!confirm('Remover este medicamento?')) return
    await deleteMedication(id)
    await refresh()
  }

  const handleTaken = async (id) => {
    setSavingId(id)
    await logMedicationTaken(id)
    setSavingId(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Pill size={32} color="var(--color-accent)" />
        <h2 className={styles.title}>Medicamentos</h2>
      </div>

      {!adding && (
        <button className={styles.addBtn} onClick={() => setAdding(true)}>
          <Plus size={18} /> Adicionar medicamento
        </button>
      )}

      {adding && (
        <form className={styles.form} onSubmit={handleAdd}>
          <input
            className={styles.input}
            placeholder="Nome (ex: Dipirona)"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            autoFocus
          />
          <input
            className={styles.input}
            placeholder="Dosagem (ex: 500 mg)"
            value={form.dosage}
            onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))}
          />
          <input
            className={styles.input}
            placeholder="Horário (ex: 8h e 20h)"
            value={form.schedule}
            onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))}
          />
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => { setAdding(false); setError('') }}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn}>Salvar</button>
          </div>
        </form>
      )}

      {loading && <p className={styles.muted}>Carregando…</p>}

      {!loading && meds.length === 0 && !adding && (
        <p className={styles.muted}>Nenhum medicamento cadastrado ainda.</p>
      )}

      <ul className={styles.list}>
        {meds.map(m => (
          <li key={m.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{m.name}</span>
              {m.dosage && <span className={styles.itemMeta}>{m.dosage}</span>}
              {m.schedule && <span className={styles.itemMeta}>· {m.schedule}</span>}
            </div>
            <div className={styles.itemActions}>
              <button
                className={styles.takenBtn}
                onClick={() => handleTaken(m.id)}
                disabled={savingId === m.id}
                aria-label="Registrar tomada"
              >
                <Check size={16} />
                <span>{savingId === m.id ? 'Salvando…' : 'Tomei'}</span>
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(m.id)}
                aria-label="Remover medicamento"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
