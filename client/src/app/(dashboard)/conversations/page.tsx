'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Filter, User, MessageCircle, Instagram, Globe } from 'lucide-react'
import { conversations } from '@/app/lib/constants'

export default function ConversationsPage() {
  const [selectedChannel, setSelectedChannel] = useState('all')
  const router = useRouter()

  const handleConversationClick = (id: number) => {
    // you can pass the conversation id as query if you want
    router.push(`/chat/${id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Conversations</h3>
          <div className="flex items-center space-x-3">
            <select 
              className="border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
            >
              <option value="all">All Channels</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
              <option value="website">Website</option>
            </select>
            <button className="border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center space-x-2 text-gray-900 dark:text-white">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {conversations.map(conv => (
          <div 
            key={conv.id} 
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => handleConversationClick(conv?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{conv.user}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{conv.preview}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  {conv.platform === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                  {conv.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-500" />}
                  {conv.platform === 'website' && <Globe className="w-4 h-4 text-blue-500" />}
                  <span className="text-sm text-gray-500 dark:text-gray-300">{conv.time}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  conv.status === 'unread' ? 'bg-red-100 text-red-600' :
                  conv.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  conv.status === 'resolved' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {conv.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
