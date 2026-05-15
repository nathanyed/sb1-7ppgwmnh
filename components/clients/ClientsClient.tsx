'use client'
import { useEffect, useState } from 'react'
import { Plus, X, User } from 'lucide-react'

interface BookingRef {
  scheduled_date: string
  status: string
  service_type: string
  scheduled_time: string
  location: string
}

interface Client {
  id: number
  name: string
  phone: string | null
  source: string
  created_at: string
  _count: { bookings: number }
  bookings: BookingRef[]
}

export default function ClientsClient() {
  const [clients, setClients] = useState<Client[]>([])
  const [selected, setSelected] = useState<Client | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function loadClients() {
    fetch('/api/clients').then(r => r.json()).then(setClients)
  }

  useEffect(() => { loadClients() }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Failed'); return }
    loadClients()
    setShowNew(false)
    setForm({ name: '', phone: '' })
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Plus size={16} /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Bookings</th>
              <th className="px-4 py-3 text-left">Last Booking</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No clients yet.</td></tr>
            )}
            {clients.map(c => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400 flex-shrink-0" />
                    {c.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{c.phone || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.source === 'facebook' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {c.source}
                  </span>
                </td>
                <td className="px-4 py-3">{c._count.bookings}</td>
                <td className="px-4 py-3 text-gray-600">
                  {c.bookings[0]
                    ? new Date(c.bookings[0].scheduled_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-lg shadow-xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{selected.name}</h2>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <div className="space-y-1 text-sm mb-4">
              <p><span className="font-medium">Phone:</span> {selected.phone || '—'}</p>
              <p><span className="font-medium">Source:</span> {selected.source}</p>
              <p><span className="font-medium">Member since:</span> {new Date(selected.created_at).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p><span className="font-medium">Total Bookings:</span> {selected._count.bookings}</p>
            </div>
            <h3 className="font-semibold mb-2 text-sm text-gray-700">All Bookings</h3>
            <div className="space-y-2">
              {selected.bookings.length === 0 && (
                <p className="text-gray-400 text-sm">No bookings yet.</p>
              )}
              {selected.bookings.map((b, i) => (
                <div key={i} className="border rounded p-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{b.service_type}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {new Date(b.scheduled_date).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })} at {b.scheduled_time}
                      </p>
                      <p className="text-gray-500 text-xs">{b.location}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                      b.status === 'completed' ? 'bg-green-100 text-green-700' :
                      b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNew(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">New Client</h2>
              <button onClick={() => setShowNew(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="mt-1 w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Phone</label>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Client'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
