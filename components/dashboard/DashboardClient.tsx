'use client'
import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { DollarSign, TrendingUp, Megaphone, MessageCircle, Calendar } from 'lucide-react'

interface DashboardData {
  revenueThisWeek: number
  revenueThisMonth: number
  expensesThisWeek: number
  expensesThisMonth: number
  netProfitThisMonth: number
  adSpendThisWeek: number
  adSpendThisMonth: number
  totalImpressionsMonth: number
  totalClicksMonth: number
  unreadMessageCount: number
  bookingsTodayCount: number
}

interface RevenueRecord { date: string; amount: number }
interface ExpenseRecord { category: string; amount: number }
interface BookingRecord {
  id: number
  client: { name: string }
  scheduled_time: string
  location: string
  status: string
}

function formatCAD(amount: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount)
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [bookingsToday, setBookingsToday] = useState<BookingRecord[]>([])
  const [revenueChartData, setRevenueChartData] = useState<{ date: string; revenue: number }[]>([])
  const [expenseChartData, setExpenseChartData] = useState<{ category: string; amount: number }[]>([])

  useEffect(() => {
    fetch('/api/dashboard').then(r => r.json()).then(setData)

    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    fetch(`/api/bookings?start=${todayStr}&end=${todayStr}`)
      .then(r => r.json())
      .then(setBookingsToday)

    fetch('/api/revenue')
      .then(r => r.json())
      .then((records: RevenueRecord[]) => {
        const map: Record<string, number> = {}
        records.forEach(r => {
          const d = r.date.split('T')[0]
          map[d] = (map[d] || 0) + r.amount
        })
        setRevenueChartData(
          Object.entries(map)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, revenue]) => ({ date: date.slice(5), revenue }))
        )
      })

    fetch('/api/expenses')
      .then(r => r.json())
      .then((records: ExpenseRecord[]) => {
        const map: Record<string, number> = {}
        records.forEach(r => {
          map[r.category] = (map[r.category] || 0) + r.amount
        })
        setExpenseChartData(
          Object.entries(map).map(([category, amount]) => ({ category, amount }))
        )
      })
  }, [])

  if (!data) return <div className="text-gray-500">Loading dashboard...</div>

  const cards = [
    { label: 'Revenue This Week', value: formatCAD(data.revenueThisWeek), icon: DollarSign, color: 'bg-green-100 text-green-700' },
    { label: 'Revenue This Month', value: formatCAD(data.revenueThisMonth), icon: TrendingUp, color: 'bg-blue-100 text-blue-700' },
    { label: 'Net Profit This Month', value: formatCAD(data.netProfitThisMonth), icon: TrendingUp, color: data.netProfitThisMonth >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700' },
    { label: 'Ad Spend This Month', value: formatCAD(data.adSpendThisMonth), icon: Megaphone, color: 'bg-purple-100 text-purple-700' },
    { label: 'Unread Messages', value: String(data.unreadMessageCount), icon: MessageCircle, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Bookings Today', value: String(data.bookingsTodayCount), icon: Calendar, color: 'bg-indigo-100 text-indigo-700' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border p-4 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              <p className="text-xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-sm font-semibold mb-4 text-gray-700">Daily Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => formatCAD(Number(v))} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-sm font-semibold mb-4 text-gray-700">Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={expenseChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => formatCAD(Number(v))} />
              <Bar dataKey="amount" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-700">Today&apos;s Bookings</h2>
        </div>
        {bookingsToday.length === 0 ? (
          <p className="text-gray-500 text-sm p-4">No bookings today.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookingsToday.map(b => (
                <tr key={b.id}>
                  <td className="px-4 py-2 font-medium">{b.client.name}</td>
                  <td className="px-4 py-2">{b.scheduled_time}</td>
                  <td className="px-4 py-2 text-gray-600">{b.location.split(',')[0]}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-800'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
