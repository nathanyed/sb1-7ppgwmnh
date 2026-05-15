import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  const where: Record<string, unknown> = {}
  if (category) where.category = category
  if (start || end) {
    where.date = {}
    if (start) (where.date as Record<string, unknown>).gte = new Date(start)
    if (end) (where.date as Record<string, unknown>).lte = new Date(end + 'T23:59:59.999Z')
  }

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(expenses)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { category, description, amount, date } = body
  if (!category || !description || !amount || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const expense = await prisma.expense.create({
    data: {
      category,
      description,
      amount: Number(amount),
      date: new Date(date),
    },
  })
  return NextResponse.json(expense, { status: 201 })
}
