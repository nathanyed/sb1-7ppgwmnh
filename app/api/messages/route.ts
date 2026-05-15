import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const messages = await prisma.message.findMany({
    include: { client: true },
    orderBy: [{ read: 'asc' }, { timestamp: 'desc' }],
  })
  return NextResponse.json(messages)
}
