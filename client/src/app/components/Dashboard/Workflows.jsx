// components/Dashboard/Workflows.js
import React from 'react';
import { Plus, Settings, Eye, Play, Pause, Workflow } from 'lucide-react';

const Workflows = ({ workflows, baseClasses, darkMode }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${baseClasses.text}`}>Automated Workflows</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 hover:shadow-lg transform hover:scale-105">
                    <Plus className="w-4 h-4" />
                    <span>Create Workflow</span>
                </button>
            </div>

            <div className={`${baseClasses.cardBg} rounded-xl ${baseClasses.shadow} ${baseClasses.borderLight} border`}>
                <div className={`divide-y ${baseClasses.border}`}>
                    {workflows.map((workflow, index) => (
                        <div
                            key={workflow.id}
                            className={`p-6 ${baseClasses.hover} transition-all duration-300`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`${darkMode ? 'bg-purple-900' : 'bg-purple-100'} p-3 rounded-lg`}>
                                        <Workflow className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className={`font-medium ${baseClasses.text}`}>{workflow.name}</h4>
                                        <p className={`text-sm ${baseClasses.textSecondary}`}>Trigger: &quot;{workflow.trigger}&quot;</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className={`text-sm font-medium ${baseClasses.text}`}>{workflow.completions} completions</p>
                                        <p className={`text-xs ${workflow.status === 'active' ? 'text-green-600' :
                                                workflow.status === 'draft' ? 'text-yellow-600' : 'text-gray-500'
                                            }`}>
                                            {workflow.status}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button className={`p-2 ${baseClasses.textMuted} hover:text-blue-600 transition-all duration-300 transform hover:scale-110`}>
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className={`p-2 ${baseClasses.textMuted} hover:text-blue-600 transition-all duration-300 transform hover:scale-110`}>
                                            <Settings className="w-4 h-4" />
                                        </button>
                                        <button className={`p-2 transition-all duration-300 transform hover:scale-110 ${workflow.status === 'active' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'
                                            }`}>
                                            {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workflows;