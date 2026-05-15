'use client'
import { useState } from 'react'
import { RefreshCw, Megaphone, Eye, MousePointer, TrendingDown, DollarSign } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface AdInsight {
  id: number
  date: string
  spend: number
  impressions: number
  reach: number
  clicks: number
  ctr: number
  cost_per_result: number | null
}

function formatCAD(v: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(v)
}

export default function AdsClient() {
  const [insights, setInsights] = useState<AdInsight[]>([])
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState('')
  const [synced, setSynced] = useState(false)

  async function handleSync() {
    setSyncing(true)
    setSyncError('')
    try {
      const res = await fetch('/api/ads/sync')
      const data = await res.json()
      if (res.ok && Array.isArray(data)) {
        setInsights(data)
        setSynced(true)
      } else {
        setSyncError(data.error || 'Sync failed — check your Meta credentials in .env.local')
      }
    } catch {
      setSyncError('Network error during sync')
    }
    setSyncing(false)
  }

  const totalSpend = insights.reduce((s, r) => s + r.spend, 0)
  const totalImpressions = insights.reduce((s, r) => s + r.impressions, 0)
  const totalClicks = insights.reduce((s, r) => s + r.clicks, 0)
  const avgCTR = insights.length
    ? insights.reduce((s, r) => s + r.ctr, 0) / insights.length
    : 0
  const cprInsights = insights.filter(r => r.cost_per_result != null)
  const avgCPR = cprInsights.length
    ? cprInsights.reduce((s, r) => s + (r.cost_per_result || 0), 0) / cprInsights.length
    : null

  const sorted = [...insights].sort((a, b) => a.date.localeCompare(b.date))

  const cards = [
    { label: 'Total Spend This Month', value: formatCAD(totalSpend), icon: DollarSign, color: 'bg-purple-100 text-purple-700' },
    { label: 'Total Impressions', value: totalImpressions.toLocaleString(), icon: Eye, color: 'bg-blue-100 text-blue-700' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: MousePointer, color: 'bg-green-100 text-green-700' },
    { label: 'Average CTR', value: `${avgCTR.toFixed(2)}%`, icon: TrendingDown, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Avg Cost Per Result', value: avgCPR != null ? formatCAD(avgCPR) : '—', icon: Megaphone, color: 'bg-red-100 text-red-700' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Pull daily performance data from the Meta Marketing API.
        </p>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {syncError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {syncError}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-2">
            <div className={`p-2 rounded-lg w-fit ${card.color}`}>
              <card.icon size={18} />
            </div>
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className="text-lg font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {sorted.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-sm font-semibold mb-4 text-gray-700">Daily Spend (This Month)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sorted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={d => d.split('T')[0].slice(5)}
                tick={{ fontSize: 10 }}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => formatCAD(Number(v))} labelFormatter={l => l.split('T')[0]} />
              <Line type="monotone" dataKey="spend" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {sorted.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Spend</th>
                <th className="px-4 py-3 text-right">Impressions</th>
                <th className="px-4 py-3 text-right">Reach</th>
                <th className="px-4 py-3 text-right">Clicks</th>
                <th className="px-4 py-3 text-right">CTR</th>
                <th className="px-4 py-3 text-right">Cost/Result</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[...sorted].reverse().map(r => (
                <tr key={r.id}>
                  <td className="px-4 py-2">
                    {new Date(r.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-2 text-right">{formatCAD(r.spend)}</td>
                  <td className="px-4 py-2 text-right">{r.impressions.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{r.reach.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{r.clicks.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{r.ctr.toFixed(2)}%</td>
                  <td className="px-4 py-2 text-right">
                    {r.cost_per_result != null ? formatCAD(r.cost_per_result) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!synced && !syncing && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-400">
          <Megaphone size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No ad data yet</p>
          <p className="text-sm mt-1">Add your Meta credentials to .env.local then click &quot;Sync Now&quot;</p>
        </div>
      )}
    </div>
  )
}
