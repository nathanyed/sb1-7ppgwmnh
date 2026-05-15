import MessagesClient from '@/components/messages/MessagesClient'

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <MessagesClient />
    </div>
  )
}
