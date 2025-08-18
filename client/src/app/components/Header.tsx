'use client'

import { Bot, Search, Bell } from 'lucide-react'
import ThemeToggle from './ui/ThemeToggle'
import UserDropdown from './ui/UserDropdown'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">ChatBot Platform</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-colors"
            />
          </div>

          <ThemeToggle />
          
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
          
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}