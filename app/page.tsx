import { Suspense } from 'react'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <DashboardClient />
      </Suspense>
    </div>
  )
}
