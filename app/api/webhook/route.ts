import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }
  return new Response('Forbidden', { status: 403 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const entries = body.entry || []

    for (const entry of entries) {
      const messaging = entry.messaging || []
      for (const event of messaging) {
        if (!event.message) continue
        const psid = event.sender?.id
        const text = event.message?.text
        if (!psid || !text) continue

        let senderName = 'Unknown'
        try {
          const res = await fetch(
            `https://graph.facebook.com/${psid}?fields=name&access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`
          )
          const data = await res.json()
          if (data.name) senderName = data.name
        } catch {}

        const client = await prisma.client.upsert({
          where: { facebook_user_id: psid },
          update: {},
          create: {
            facebook_user_id: psid,
            name: senderName,
            source: 'facebook',
          },
        })

        await prisma.message.create({
          data: {
            client_id: client.id,
            direction: 'inbound',
            content: text,
            timestamp: new Date(),
          },
        })
      }
    }
  } catch {}

  return NextResponse.json({ status: 'ok' })
}
