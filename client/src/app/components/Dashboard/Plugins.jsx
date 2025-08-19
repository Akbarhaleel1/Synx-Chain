// components/Dashboard/Plugins.js
import React from 'react';
import { Plus, Settings } from 'lucide-react';

const Plugins = ({ plugins, baseClasses, darkMode }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${baseClasses.text}`}>Plugin Marketplace</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 hover:shadow-lg transform hover:scale-105">
                    <Plus className="w-4 h-4" />
                    <span>Install Plugin</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plugins.map((plugin, index) => {
                    const IconComponent = plugin.icon;
                    return (
                        <div
                            key={plugin.id}
                            className={`${baseClasses.cardBg} rounded-xl p-6 ${baseClasses.shadow} ${baseClasses.borderLight} border transform hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${darkMode ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-lg`}>
                                    <IconComponent className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${plugin.status === 'active' ? `${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-600'}` : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                                    }`}>
                                    {plugin.status}
                                </div>
                            </div>

                            <h4 className={`font-semibold ${baseClasses.text} mb-2`}>{plugin.name}</h4>
                            <p className={`text-sm ${baseClasses.textSecondary} mb-4`}>Usage: {plugin.usage}%</p>
                            <p className={`text-xs ${baseClasses.textMuted} mb-4`}>{plugin.installs.toLocaleString()} installs</p>

                            <div className="flex space-x-2">
                                <button className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${plugin.status === 'active'
                                        ? `${darkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'}`
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}>
                                    {plugin.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button className={`px-3 py-2 border ${baseClasses.border} rounded-lg ${baseClasses.hover} transition-all duration-300 transform hover:scale-105`}>
                                    <Settings className={`w-4 h-4 ${baseClasses.textMuted}`} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Plugins;