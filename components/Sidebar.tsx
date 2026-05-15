'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageCircle,
  Receipt,
  BarChart2,
  Menu,
  X,
  Car,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bookings', label: 'Bookings', icon: Calendar },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/messages', label: 'Messages', icon: MessageCircle },
  { href: '/expenses', label: 'Expenses', icon: Receipt },
  { href: '/ads', label: 'Ads', icon: BarChart2 },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              active
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 bg-white border-b px-4 py-3">
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 font-bold text-blue-600">
          <Car size={20} />
          HeadlightPro
        </div>
      </div>
      <div className="lg:hidden h-14" />

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2 font-bold text-blue-600">
            <Car size={20} />
            HeadlightPro
          </div>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>
        {nav}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-56 bg-white border-r h-screen flex-shrink-0">
        <div className="flex items-center gap-2 px-4 py-5 font-bold text-blue-600 text-lg border-b">
          <Car size={22} />
          HeadlightPro
        </div>
        {nav}
      </div>
    </>
  )
}
