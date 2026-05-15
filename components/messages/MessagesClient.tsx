'use client'
import { useEffect, useState } from 'react'
import { MessageCircle, CalendarPlus } from 'lucide-react'

interface Client {
  id: number
  name: string
}

interface Message {
  id: number
  client_id: number
  client: Client
  direction: string
  content: string
  timestamp: string
  read: boolean
}

interface ConversationEntry {
  client: Client
  messages: Message[]
  hasUnread: boolean
  lastTime: number
}

export default function MessagesClient() {
  const [messages, setMessages] = useState<Message[]>([])
  const [activeClientId, setActiveClientId] = useState<number | null>(null)

  function loadMessages() {
    fetch('/api/messages').then(r => r.json()).then(setMessages)
  }

  useEffect(() => { loadMessages() }, [])

  const clientMap = new Map<number, ConversationEntry>()
  for (const m of messages) {
    if (!clientMap.has(m.client_id)) {
      clientMap.set(m.client_id, { client: m.client, messages: [], hasUnread: false, lastTime: 0 })
    }
    const entry = clientMap.get(m.client_id)!
    entry.messages.push(m)
    if (!m.read) entry.hasUnread = true
    const t = new Date(m.timestamp).getTime()
    if (t > entry.lastTime) entry.lastTime = t
  }

  const conversations = Array.from(clientMap.values()).sort((a, b) => b.lastTime - a.lastTime)
  const activeConv = activeClientId ? clientMap.get(activeClientId) : null

  async function openThread(clientId: number) {
    setActiveClientId(clientId)
    const unread = clientMap.get(clientId)?.messages.filter(m => !m.read) || []
    await Promise.all(unread.map(m =>
      fetch(`/api/messages/${m.id}/read`, { method: 'PATCH' })
    ))
    if (unread.length > 0) loadMessages()
  }

  const sortedThread = activeConv
    ? [...activeConv.messages].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : []

  return (
    <div className="flex gap-4 h-[calc(100vh-160px)] min-h-[400px]">
      <div className="w-64 flex-shrink-0 bg-white rounded-xl shadow-sm border overflow-y-auto">
        {conversations.length === 0 && (
          <p className="text-gray-400 text-sm p-4">No messages yet.</p>
        )}
        {conversations.map(({ client, messages: msgs, hasUnread }) => {
          const last = msgs[msgs.length - 1]
          return (
            <div
              key={client.id}
              onClick={() => openThread(client.id)}
              className={`px-4 py-3 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                activeClientId === client.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className={hasUnread ? 'text-blue-500' : 'text-gray-400'} />
                <span className={`text-sm truncate ${hasUnread ? 'font-semibold' : ''}`}>{client.name}</span>
                {hasUnread && <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
              </div>
              {last && (
                <p className="text-xs text-gray-400 mt-0.5 truncate pl-5">{last.content}</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden">
        {!activeConv ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageCircle size={40} className="mx-auto mb-2 opacity-30" />
              <p>Select a conversation</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0">
              <h3 className="font-semibold">{activeConv.client.name}</h3>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                <CalendarPlus size={16} />
                Convert to Booking
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {sortedThread.map(m => (
                <div
                  key={m.id}
                  className={`flex ${m.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    m.direction === 'inbound'
                      ? 'bg-gray-100 text-gray-900 rounded-tl-sm'
                      : 'bg-blue-600 text-white rounded-tr-sm'
                  }`}>
                    <p>{m.content}</p>
                    <p className={`text-xs mt-1 ${m.direction === 'inbound' ? 'text-gray-400' : 'text-blue-200'}`}>
                      {new Date(m.timestamp).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
