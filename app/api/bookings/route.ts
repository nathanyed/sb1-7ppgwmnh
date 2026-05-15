import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  const where: Record<string, unknown> = {}
  if (start || end) {
    where.scheduled_date = {}
    if (start) (where.scheduled_date as Record<string, unknown>).gte = new Date(start)
    if (end) (where.scheduled_date as Record<string, unknown>).lte = new Date(end + 'T23:59:59.999Z')
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: { client: true },
    orderBy: [{ scheduled_date: 'asc' }, { scheduled_time: 'asc' }],
  })
  return NextResponse.json(bookings)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { client_id, service_type, scheduled_date, scheduled_time, location, notes, price_quoted } = body
  if (!client_id || !service_type || !scheduled_date || !scheduled_time || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const booking = await prisma.booking.create({
    data: {
      client_id: Number(client_id),
      service_type,
      scheduled_date: new Date(scheduled_date),
      scheduled_time,
      location,
      notes: notes || null,
      price_quoted: price_quoted ? Number(price_quoted) : null,
      status: 'pending',
    },
    include: { client: true },
  })
  return NextResponse.json(booking, { status: 201 })
}
