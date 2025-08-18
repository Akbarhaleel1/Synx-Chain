'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BarChart3, MessageSquare, Zap, Workflow, Settings } from 'lucide-react'

const menuItems = [
  { icon: BarChart3, label: 'Overview', href: '/overview' },
  { icon: MessageSquare, label: 'Conversations', href: '/conversations' },
  { icon: Zap, label: 'Plugins', href: '/plugins' },
  { icon: Workflow, label: 'Workflows', href: '/workflows' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 px-4 py-6 transition-colors">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                  : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}