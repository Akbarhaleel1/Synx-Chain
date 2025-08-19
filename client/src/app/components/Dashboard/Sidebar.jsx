// components/Dashboard/Sidebar.js
import React from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Zap, 
  Workflow, 
  Settings 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, baseClasses, darkMode }) => {
  const menuItems = [
    { key: 'overview', icon: BarChart3, label: 'Overview' },
    { key: 'conversations', icon: MessageSquare, label: 'Conversations' },
    { key: 'plugins', icon: Zap, label: 'Plugins' },
    { key: 'workflows', icon: Workflow, label: 'Workflows' },
    { key: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 ${baseClasses.sidebarBg} border-r ${baseClasses.border} px-4 py-6 transition-all duration-300 overflow-hidden`}>
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => item.key !== 'settings' && setActiveTab(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                activeTab === item.key || (activeTab === 'chat' && item.key === 'conversations')
                  ? `${darkMode ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} text-blue-600 border shadow-md` 
                  : `${baseClasses.text} ${baseClasses.hover}`
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;