import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { status, price_paid, notes } = body
  const data: Record<string, unknown> = {}
  if (status !== undefined) data.status = status
  if (price_paid !== undefined) data.price_paid = Number(price_paid)
  if (notes !== undefined) data.notes = notes

  const booking = await prisma.booking.update({
    where: { id: Number(params.id) },
    data,
    include: { client: true },
  })
  return NextResponse.json(booking)
}
