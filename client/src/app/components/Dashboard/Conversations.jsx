// components/Dashboard/Conversations.js
import React from 'react';
import {
    Filter,
    User,
    MessageCircle,
    Instagram,
    Globe
} from 'lucide-react';

const Conversations = ({ selectedChannel, setSelectedChannel, conversations, baseClasses, darkMode }) => {
    return (
        <div className={`${baseClasses.cardBg} rounded-xl ${baseClasses.shadow} ${baseClasses.borderLight} border`}>
            <div className={`p-6 border-b ${baseClasses.border}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${baseClasses.text}`}>Recent Conversations</h3>
                    <div className="flex items-center space-x-3">
                        <select
                            className={`border ${baseClasses.border} ${baseClasses.input} rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                            value={selectedChannel}
                            onChange={(e) => setSelectedChannel(e.target.value)}
                        >
                            <option value="all">All Channels</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="instagram">Instagram</option>
                            <option value="website">Website</option>
                        </select>
                        <button className={`border ${baseClasses.border} rounded-lg px-3 py-2 text-sm flex items-center space-x-2 ${baseClasses.hover} transition-all duration-300 hover:shadow-md`}>
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`divide-y ${baseClasses.border}`}>
                {conversations.map((conv, index) => (
                    <div
                        key={conv.id}
                        className={`p-6 ${baseClasses.hover} cursor-pointer transition-all duration-300 transform hover:scale-[1.02]`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className={`font-medium ${baseClasses.text}`}>{conv.user}</h4>
                                    <p className={`text-sm ${baseClasses.textSecondary}`}>{conv.preview}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center space-x-2 mb-1">
                                    {conv.platform === 'whatsapp' && <MessageCircle className="w-4 h-4 text-green-500" />}
                                    {conv.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-500" />}
                                    {conv.platform === 'website' && <Globe className="w-4 h-4 text-blue-500" />}
                                    <span className={`text-sm ${baseClasses.textSecondary}`}>{conv.time}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${conv.status === 'unread' ? `${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'}` :
                                        conv.status === 'pending' ? `${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-600'}` :
                                            conv.status === 'resolved' ? `${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-600'}` :
                                                `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                                    }`}>
                                    {conv.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Conversations;