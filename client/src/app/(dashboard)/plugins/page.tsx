'use client'

import { plugins } from '@/app/lib/constants';
import { Plus, Settings } from 'lucide-react'

export default function PluginsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Plugin Marketplace</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Install Plugin</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map(plugin => {
          const IconComponent = plugin.icon;
          return (
            <div key={plugin.id} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  plugin.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {plugin.status}
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{plugin.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Usage: {plugin.usage}</p>
              <p className="text-xs text-gray-400 mb-4">{plugin.installs.toLocaleString()} installs</p>
              
              <div className="flex space-x-2">
                <button className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                  plugin.status === 'active' 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {plugin.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}