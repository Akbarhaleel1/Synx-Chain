'use client'

import { workflows } from '@/app/lib/constants'
import { Plus, Workflow, Eye, Settings, Play, Pause } from 'lucide-react'

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Automated Workflows</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Workflow</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                    <Workflow className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{workflow.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Trigger: &quot;{workflow.trigger}&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {workflow.completions} completions
                    </p>
                    <p
                      className={`text-xs ${
                        workflow.status === 'active'
                          ? 'text-green-600'
                          : workflow.status === 'draft'
                          ? 'text-yellow-600'
                          : 'text-gray-500 dark:text-gray-300'
                      }`}
                    >
                      {workflow.status}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-2 ${
                        workflow.status === 'active'
                          ? 'text-red-500 hover:text-red-700'
                          : 'text-green-500 hover:text-green-700'
                      }`}
                    >
                      {workflow.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
