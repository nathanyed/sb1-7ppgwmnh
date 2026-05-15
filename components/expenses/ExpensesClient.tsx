'use client'
import { useEffect, useState, useCallback } from 'react'

const CATEGORIES = ['ads', 'equipment', 'supplies', 'other']

interface Expense {
  id: number
  category: string
  description: string
  amount: number
  date: string
}

function formatCAD(v: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(v)
}

const categoryColor: Record<string, string> = {
  ads: 'bg-purple-100 text-purple-700',
  equipment: 'bg-blue-100 text-blue-700',
  supplies: 'bg-green-100 text-green-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function ExpensesClient() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [form, setForm] = useState({
    category: 'ads',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [filterStart, setFilterStart] = useState('')
  const [filterEnd, setFilterEnd] = useState('')

  const loadExpenses = useCallback(() => {
    const params = new URLSearchParams()
    if (filterCat) params.set('category', filterCat)
    if (filterStart) params.set('start', filterStart)
    if (filterEnd) params.set('end', filterEnd)
    fetch(`/api/expenses?${params.toString()}`).then(r => r.json()).then(setExpenses)
  }, [filterCat, filterStart, filterEnd])

  useEffect(() => { loadExpenses() }, [loadExpenses])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Failed'); return }
    loadExpenses()
    setForm(f => ({ ...f, description: '', amount: '' }))
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="font-semibold mb-3 text-sm text-gray-700">Add Expense</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="mt-1 w-full border rounded px-2 py-2 text-sm"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="text-xs text-gray-500">Description</label>
            <input
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              required
              className="mt-1 w-full border rounded px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Amount (CAD)</label>
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              required
              className="mt-1 w-full border rounded px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              required
              className="mt-1 w-full border rounded px-2 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 lg:col-span-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
          {error && <p className="col-span-full text-red-600 text-sm">{error}</p>}
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="date"
            value={filterStart}
            onChange={e => setFilterStart(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
          />
          <input
            type="date"
            value={filterEnd}
            onChange={e => setFilterEnd(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm"
          />
          {(filterCat || filterStart || filterEnd) && (
            <button
              onClick={() => { setFilterCat(''); setFilterStart(''); setFilterEnd('') }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {expenses.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">No expenses found.</td></tr>
              )}
              {expenses.map(e => (
                <tr key={e.id}>
                  <td className="px-4 py-2">
                    {new Date(e.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor[e.category] || 'bg-gray-100 text-gray-700'}`}>
                      {e.category}
                    </span>
                  </td>
                  <td className="px-4 py-2">{e.description}</td>
                  <td className="px-4 py-2 text-right font-medium">{formatCAD(e.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2">
                <td colSpan={3} className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Total:</td>
                <td className="px-4 py-2 text-right font-bold">{formatCAD(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
