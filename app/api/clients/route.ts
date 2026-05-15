import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const clients = await prisma.client.findMany({
    include: {
      _count: { select: { bookings: true } },
      bookings: { orderBy: { scheduled_date: 'desc' }, take: 1 },
    },
    orderBy: { created_at: 'desc' },
  })
  return NextResponse.json(clients)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone } = body
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  const client = await prisma.client.create({
    data: { name, phone: phone || null, source: 'manual' },
  })
  return NextResponse.json(client, { status: 201 })
}
