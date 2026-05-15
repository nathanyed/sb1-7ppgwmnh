import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function weekRange() {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

function monthRange() {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  return { start, end }
}

function todayRange() {
  const now = new Date()
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

export async function GET() {
  const week = weekRange()
  const month = monthRange()
  const today = todayRange()

  const [
    revenueWeekRecs,
    revenueMonthRecs,
    expensesWeekRecs,
    expensesMonthRecs,
    adSpendWeek,
    adSpendMonth,
    unreadCount,
    bookingsTodayCount,
    adInsightsMonth,
  ] = await Promise.all([
    prisma.revenue.findMany({ where: { date: { gte: week.start, lte: week.end } } }),
    prisma.revenue.findMany({ where: { date: { gte: month.start, lte: month.end } } }),
    prisma.expense.findMany({ where: { date: { gte: week.start, lte: week.end } } }),
    prisma.expense.findMany({ where: { date: { gte: month.start, lte: month.end } } }),
    prisma.adInsight.findMany({ where: { date: { gte: week.start, lte: week.end } } }),
    prisma.adInsight.findMany({ where: { date: { gte: month.start, lte: month.end } } }),
    prisma.message.count({ where: { read: false } }),
    prisma.booking.count({ where: { scheduled_date: { gte: today.start, lte: today.end } } }),
    prisma.adInsight.findMany({ where: { date: { gte: month.start, lte: month.end } } }),
  ])

  const revenueThisWeek = revenueWeekRecs.reduce((s, r) => s + r.amount, 0)
  const revenueThisMonth = revenueMonthRecs.reduce((s, r) => s + r.amount, 0)
  const expensesThisWeek = expensesWeekRecs.reduce((s, r) => s + r.amount, 0)
  const expensesThisMonth = expensesMonthRecs.reduce((s, r) => s + r.amount, 0)
  const adSpendThisWeek = adSpendWeek.reduce((s, r) => s + r.spend, 0)
  const adSpendThisMonth = adSpendMonth.reduce((s, r) => s + r.spend, 0)
  const totalImpressionsMonth = adInsightsMonth.reduce((s, r) => s + r.impressions, 0)
  const totalClicksMonth = adInsightsMonth.reduce((s, r) => s + r.clicks, 0)
  const netProfitThisMonth = revenueThisMonth - expensesThisMonth

  return NextResponse.json({
    revenueThisWeek,
    revenueThisMonth,
    expensesThisWeek,
    expensesThisMonth,
    netProfitThisMonth,
    adSpendThisWeek,
    adSpendThisMonth,
    totalImpressionsMonth,
    totalClicksMonth,
    unreadMessageCount: unreadCount,
    bookingsTodayCount,
  })
}
