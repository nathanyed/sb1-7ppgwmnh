import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const revenue = await prisma.revenue.findMany({
    include: { booking: { include: { client: true } } },
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(revenue)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { booking_id, amount, payment_method, date, notes } = body
  if (!amount || !payment_method || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const revenue = await prisma.revenue.create({
    data: {
      booking_id: booking_id ? Number(booking_id) : null,
      amount: Number(amount),
      payment_method,
      date: new Date(date),
      notes: notes || null,
    },
    include: { booking: { include: { client: true } } },
  })
  return NextResponse.json(revenue, { status: 201 })
}
