'use client'

import { channels, plugins } from '@/app/lib/constants';
import { 
  MessageSquare, 
  Users,
  Plus
} from 'lucide-react'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Total Chats</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2,773</p>
              <p className="text-green-500 text-sm">+12% from last week</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,847</p>
              <p className="text-green-500 text-sm">+8% from last week</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Bot Responses</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">4,521</p>
            <p className="text-purple-500 text-sm">+25% automation</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Avg Response Time</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2s</p>
            <p className="text-green-500 text-sm">-0.3s improvement</p>
          </div>
        </div>
      </div>

      {/* Connected Channels */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connected Channels</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Channel</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map(channel => {
            const IconComponent = channel.icon;
            return (
              <div key={channel.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className={`w-8 h-8 ${channel.color}`} />
                  <div className={`w-3 h-3 rounded-full ${channel.status === 'connected' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{channel.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{channel.status}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{channel.messages.toLocaleString()} messages</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chat Volume (Last 7 Days)</h3>
          <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-end justify-center">
            <div className="flex items-end space-x-2 h-32">
              {[65, 72, 68, 85, 79, 92, 88].map((height, index) => (
                <div key={index} className="bg-blue-500 rounded-t-sm" style={{width: '24px', height: `${height}%`}}></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Plugin Performance</h3>
          <div className="space-y-4">
            {plugins.filter(p => p.status === 'active').map(plugin => {
              const IconComponent = plugin.icon;
              return (
                <div key={plugin.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-white">{plugin.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: plugin.usage}}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{plugin.usage}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}