'use client'
import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getWeekDates(base: Date) {
  const start = new Date(base)
  start.setDate(base.getDate() - base.getDay())
  start.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function formatCAD(v: number | null | undefined) {
  if (v == null) return '—'
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(v)
}

function statusClass(status: string) {
  return ({
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  } as Record<string, string>)[status] || 'bg-gray-100 text-gray-800'
}

interface Client {
  id: number
  name: string
  phone: string | null
  source: string
}

interface Booking {
  id: number
  client_id: number
  client: Client
  service_type: string
  scheduled_date: string
  scheduled_time: string
  location: string
  status: string
  notes: string | null
  price_quoted: number | null
  price_paid: number | null
}

export default function BookingsClient() {
  const [weekBase, setWeekBase] = useState(new Date())
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selected, setSelected] = useState<Booking | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [saving, setSaving] = useState(false)
  const [patchData, setPatchData] = useState({ status: '', price_paid: '', notes: '' })

  const weekDates = getWeekDates(weekBase)
  const start = weekDates[0].toISOString().split('T')[0]
  const end = weekDates[6].toISOString().split('T')[0]

  const loadBookings = useCallback(() => {
    fetch(`/api/bookings?start=${start}&end=${end}`)
      .then(r => r.json())
      .then(setBookings)
  }, [start, end])

  useEffect(() => { loadBookings() }, [loadBookings])
  useEffect(() => { fetch('/api/clients').then(r => r.json()).then(setClients) }, [])

  function bookingsForDay(date: Date) {
    return bookings.filter(b => {
      const bd = new Date(b.scheduled_date)
      return bd.toDateString() === date.toDateString()
    }).sort((a, b) => a.scheduled_time.localeCompare(b.scheduled_time))
  }

  async function handleSave() {
    if (!selected) return
    setSaving(true)
    const payload: Record<string, unknown> = {}
    if (patchData.status) payload.status = patchData.status
    if (patchData.price_paid !== '') payload.price_paid = parseFloat(patchData.price_paid)
    if (patchData.notes !== '') payload.notes = patchData.notes
    await fetch(`/api/bookings/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setSelected(null)
    loadBookings()
  }

  const prevWeek = () => { const d = new Date(weekBase); d.setDate(d.getDate() - 7); setWeekBase(d) }
  const nextWeek = () => { const d = new Date(weekBase); d.setDate(d.getDate() + 7); setWeekBase(d) }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prevWeek} className="p-2 rounded-lg hover:bg-gray-100">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium">
            {weekDates[0].toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
            {' – '}
            {weekDates[6].toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <button onClick={nextWeek} className="p-2 rounded-lg hover:bg-gray-100">
            <ChevronRight size={18} />
          </button>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Plus size={16} /> New Booking
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 overflow-x-auto min-w-[600px]">
        {weekDates.map((date, i) => (
          <div key={i} className="min-h-[300px]">
            <div className={`text-center py-1 text-xs font-semibold mb-2 rounded ${
              date.toDateString() === new Date().toDateString()
                ? 'bg-blue-600 text-white'
                : 'text-gray-500'
            }`}>
              <div>{DAYS[date.getDay()]}</div>
              <div className="text-sm font-bold">{date.getDate()}</div>
            </div>
            <div className="space-y-1">
              {bookingsForDay(date).map(b => (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelected(b)
                    setPatchData({ status: b.status, price_paid: b.price_paid?.toString() || '', notes: b.notes || '' })
                  }}
                  className={`p-1.5 rounded border text-xs cursor-pointer hover:shadow-sm transition-shadow ${statusClass(b.status)}`}
                >
                  <div className="font-semibold truncate">{b.client.name}</div>
                  <div className="opacity-75">{b.scheduled_time}</div>
                  <div className="opacity-75 truncate">{b.location.split(',')[0]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md shadow-xl overflow-y-auto p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Booking Details</h2>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Client:</span> {selected.client.name}</p>
              <p><span className="font-medium">Phone:</span> {selected.client.phone || '—'}</p>
              <p><span className="font-medium">Source:</span> {selected.client.source}</p>
              <p><span className="font-medium">Service:</span> {selected.service_type}</p>
              <p><span className="font-medium">Date:</span> {new Date(selected.scheduled_date).toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <p><span className="font-medium">Time:</span> {selected.scheduled_time}</p>
              <p><span className="font-medium">Location:</span> {selected.location}</p>
              <p><span className="font-medium">Price Quoted:</span> {formatCAD(selected.price_quoted)}</p>
              <p><span className="font-medium">Price Paid:</span> {formatCAD(selected.price_paid)}</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Status</label>
                <select
                  value={patchData.status}
                  onChange={e => setPatchData(p => ({ ...p, status: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2 text-sm"
                >
                  {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Price Paid (CAD)</label>
                <input
                  type="number"
                  value={patchData.price_paid}
                  onChange={e => setPatchData(p => ({ ...p, price_paid: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Notes</label>
                <textarea
                  value={patchData.notes}
                  onChange={e => setPatchData(p => ({ ...p, notes: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewForm && (
        <NewBookingModal
          clients={clients}
          onClose={() => setShowNewForm(false)}
          onCreated={loadBookings}
        />
      )}
    </div>
  )
}

function NewBookingModal({
  clients,
  onClose,
  onCreated,
}: {
  clients: Client[]
  onClose: () => void
  onCreated: () => void
}) {
  const [form, setForm] = useState({
    client_id: '',
    service_type: '',
    scheduled_date: '',
    scheduled_time: '',
    location: '',
    notes: '',
    price_quoted: '',
  })
  const [clientSearch, setClientSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price_quoted: form.price_quoted || undefined }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Failed to create booking'); return }
    onCreated()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Booking</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <label className="text-xs font-medium text-gray-600">Client *</label>
            <input
              value={clientSearch}
              onChange={e => { setClientSearch(e.target.value); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              placeholder="Search clients..."
            />
            {showDropdown && clientSearch && (
              <div className="absolute z-10 w-full border rounded-b bg-white shadow mt-0.5 max-h-40 overflow-y-auto">
                {filteredClients.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-400">No clients found</div>
                )}
                {filteredClients.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setForm(f => ({ ...f, client_id: String(c.id) }))
                      setClientSearch(c.name)
                      setShowDropdown(false)
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${form.client_id === String(c.id) ? 'bg-blue-50' : ''}`}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Service Type *</label>
            <input
              value={form.service_type}
              onChange={e => setForm(f => ({ ...f, service_type: e.target.value }))}
              required
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              placeholder="e.g. Headlight Restoration"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Date *</label>
              <input
                type="date"
                value={form.scheduled_date}
                onChange={e => setForm(f => ({ ...f, scheduled_date: e.target.value }))}
                required
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Time *</label>
              <input
                type="time"
                value={form.scheduled_time}
                onChange={e => setForm(f => ({ ...f, scheduled_time: e.target.value }))}
                required
                className="mt-1 w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Location *</label>
            <input
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              required
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              placeholder="Full address"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Price Quoted (CAD)</label>
            <input
              type="number"
              value={form.price_quoted}
              onChange={e => setForm(f => ({ ...f, price_quoted: e.target.value }))}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Notes</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              rows={2}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !form.client_id}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}
