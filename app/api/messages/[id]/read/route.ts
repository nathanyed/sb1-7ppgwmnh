import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const message = await prisma.message.update({
    where: { id: Number(params.id) },
    data: { read: true },
  })
  return NextResponse.json(message)
}
