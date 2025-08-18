'use client'

import { useState, useRef, useEffect } from 'react'
import { User, ChevronDown, CreditCard, Key, LogOut } from 'lucide-react'

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-white">John Doe</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-2 w-48 z-50">
          <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <CreditCard className="w-4 h-4" />
            <span>Billing</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Key className="w-4 h-4" />
            <span>API Keys</span>
          </a>
          <hr className="my-2 border-gray-200 dark:border-gray-800" />
          <a href="#" className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </a>
        </div>
      )}
    </div>
  )
}