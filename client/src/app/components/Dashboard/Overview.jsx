// components/Dashboard/Overview.js
import React from 'react';
import {
    MessageSquare,
    Users,
    Bot,
    Clock,
    Plus,
    MessageCircle,
    Instagram,
    Globe,
    Smartphone
} from 'lucide-react';

const Overview = ({ darkMode, channels, plugins, baseClasses }) => {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: 'Total Chats', value: '2,773', change: '+12% from last week', icon: MessageSquare, bgColor: darkMode ? 'bg-blue-900' : 'bg-blue-100' },
                    { title: 'Active Users', value: '1,847', change: '+8% from last week', icon: Users, bgColor: darkMode ? 'bg-green-900' : 'bg-green-100' },
                    { title: 'Bot Responses', value: '4,521', change: '+25% automation', icon: Bot, bgColor: darkMode ? 'bg-purple-900' : 'bg-purple-100' },
                    { title: 'Avg Response Time', value: '1.2s', change: '-0.3s improvement', icon: Clock, bgColor: darkMode ? 'bg-orange-900' : 'bg-orange-100' }
                ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`${baseClasses.cardBg} rounded-xl p-6 ${baseClasses.shadow} ${baseClasses.borderLight} border transform hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`${baseClasses.textSecondary} text-sm`}>{stat.title}</p>
                                    <p className={`text-2xl font-bold ${baseClasses.text}`}>{stat.value}</p>
                                    <p className="text-green-500 text-sm">{stat.change}</p>
                                </div>
                                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                    <IconComponent className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Connected Channels */}
            <div className={`${baseClasses.cardBg} rounded-xl p-6 ${baseClasses.shadow} ${baseClasses.borderLight} border`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${baseClasses.text}`}>Connected Channels</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 hover:shadow-lg transform hover:scale-105">
                        <Plus className="w-4 h-4" />
                        <span>Add Channel</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {channels.map((channel, index) => {
                        const IconComponent = channel.icon;
                        return (
                            <div
                                key={channel.id}
                                className={`border ${baseClasses.border} rounded-lg p-4 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-md`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <IconComponent className={`w-8 h-8 ${channel.color}`} />
                                    <div className={`w-3 h-3 rounded-full ${channel.status === 'connected' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <h4 className={`font-medium ${baseClasses.text} mb-1`}>{channel.name}</h4>
                                <p className={`text-sm ${baseClasses.textSecondary} mb-2 capitalize`}>{channel.status}</p>
                                <p className={`text-lg font-semibold ${baseClasses.text}`}>{channel.messages.toLocaleString()} messages</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${baseClasses.cardBg} rounded-xl p-6 ${baseClasses.shadow} ${baseClasses.borderLight} border`}>
                    <h3 className={`text-lg font-semibold ${baseClasses.text} mb-4`}>Chat Volume (Last 7 Days)</h3>
                    <div className={`h-48 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-lg flex items-end justify-center`}>
                        <div className="flex items-end space-x-2 h-32">
                            {[65, 72, 68, 85, 79, 92, 88].map((height, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-500 rounded-t-sm transform hover:scale-110 transition-all duration-300"
                                    style={{ width: '24px', height: `${height}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`${baseClasses.cardBg} rounded-xl p-6 ${baseClasses.shadow} ${baseClasses.borderLight} border`}>
                    <h3 className={`text-lg font-semibold ${baseClasses.text} mb-4`}>Plugin Performance</h3>
                    <div className="space-y-4">
                        {plugins.filter(p => p.status === 'active').map((plugin, index) => {
                            const IconComponent = plugin.icon;
                            return (
                                <div
                                    key={plugin.id}
                                    className={`flex items-center justify-between p-3 rounded-lg ${baseClasses.hover} transition-all duration-300`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <IconComponent className={`w-5 h-5 ${baseClasses.textMuted}`} />
                                        <span className={baseClasses.text}>{plugin.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${plugin.usage}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-sm ${baseClasses.textMuted}`}>{plugin.usage}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;