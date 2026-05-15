import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const accountId = process.env.FACEBOOK_AD_ACCOUNT_ID
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

  if (!accountId || !accessToken) {
    return NextResponse.json({ error: 'Missing Facebook credentials' }, { status: 400 })
  }

  const url = new URL(`https://graph.facebook.com/v19.0/${accountId}/insights`)
  url.searchParams.set('fields', 'spend,impressions,reach,clicks,ctr,cost_per_result')
  url.searchParams.set('date_preset', 'this_month')
  url.searchParams.set('time_increment', '1')
  url.searchParams.set('access_token', accessToken)

  const res = await fetch(url.toString())
  const json = await res.json()

  if (!json.data) {
    return NextResponse.json({ error: 'Invalid response from Meta API', details: json }, { status: 500 })
  }

  const synced = []
  for (const row of json.data) {
    const date = new Date(row.date_start)
    const record = await prisma.adInsight.upsert({
      where: { date },
      update: {
        spend: parseFloat(row.spend || '0'),
        impressions: parseInt(row.impressions || '0'),
        reach: parseInt(row.reach || '0'),
        clicks: parseInt(row.clicks || '0'),
        ctr: parseFloat(row.ctr || '0'),
        cost_per_result: row.cost_per_result ? parseFloat(row.cost_per_result) : null,
        synced_at: new Date(),
      },
      create: {
        date,
        spend: parseFloat(row.spend || '0'),
        impressions: parseInt(row.impressions || '0'),
        reach: parseInt(row.reach || '0'),
        clicks: parseInt(row.clicks || '0'),
        ctr: parseFloat(row.ctr || '0'),
        cost_per_result: row.cost_per_result ? parseFloat(row.cost_per_result) : null,
        synced_at: new Date(),
      },
    })
    synced.push(record)
  }

  return NextResponse.json(synced)
}
