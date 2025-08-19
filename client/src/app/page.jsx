'use client'
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Zap, 
  BarChart3, 
  Settings, 
  Users, 
  Bot,
  Plus,
  Search,
  Bell,
  ChevronDown,
  Filter,
  Calendar,
  TrendingUp,
  MessageCircle,
  Instagram,
  Globe,
  Smartphone,
  Activity,
  Clock,
  Star,
  Play,
  Pause,
  Eye,
  Download,
  CreditCard,
  Key,
  LogOut,
  User,
  Phone,
  ShoppingCart,
  Headphones,
  BookOpen,
  Workflow,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';

const ChatbotDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Since localStorage might not work in artifacts, we'll just use state
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', status: 'connected', messages: 1247 },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500', status: 'connected', messages: 892 },
    { id: 'website', name: 'Website Chat', icon: Globe, color: 'text-blue-500', status: 'connected', messages: 634 },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, color: 'text-purple-500', status: 'disconnected', messages: 0 }
  ];

  const plugins = [
    { id: 'booking', name: 'Booking System', icon: Calendar, status: 'active', usage: 85, installs: 1234 },
    { id: 'orders', name: 'Order Tracking', icon: ShoppingCart, status: 'active', usage: 92, installs: 987 },
    { id: 'support', name: 'Ticket Support', icon: Headphones, status: 'inactive', usage: 0, installs: 654 },
    { id: 'faq', name: 'FAQ Bot', icon: BookOpen, status: 'active', usage: 78, installs: 2341 }
  ];

  const conversations = [
    { id: 1, user: 'Sarah Johnson', platform: 'whatsapp', time: '2 min ago', preview: 'Hi, I need help with my booking...', status: 'unread' },
    { id: 2, user: 'Mike Chen', platform: 'instagram', time: '5 min ago', preview: 'Can you help me track my order?', status: 'read' },
    { id: 3, user: 'Emma Davis', platform: 'website', time: '12 min ago', preview: 'What are your business hours?', status: 'resolved' },
    { id: 4, user: 'Alex Rodriguez', platform: 'whatsapp', time: '1 hour ago', preview: 'I want to cancel my subscription', status: 'pending' }
  ];

  const workflows = [
    { id: 1, name: 'Hotel Booking Flow', trigger: 'booking inquiry', status: 'active', completions: 156 },
    { id: 2, name: 'Order Status Check', trigger: 'track order', status: 'active', completions: 203 },
    { id: 3, name: 'FAQ Assistant', trigger: 'help', status: 'active', completions: 89 },
    { id: 4, name: 'Lead Generation', trigger: 'pricing', status: 'draft', completions: 0 }
  ];

  const baseClasses = darkMode ? {
    bg: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    headerBg: 'bg-gray-800',
    sidebarBg: 'bg-gray-800',
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-gray-700',
    borderLight: 'border-gray-600',
    hover: 'hover:bg-gray-700',
    hoverLight: 'hover:bg-gray-600',
    input: 'bg-gray-700 border-gray-600 text-gray-100',
    shadow: 'shadow-lg'
  } : {
    bg: 'bg-gray-50',
    cardBg: 'bg-white',
    headerBg: 'bg-white',
    sidebarBg: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-500',
    textMuted: 'text-gray-400',
    border: 'border-gray-200',
    borderLight: 'border-gray-100',
    hover: 'hover:bg-gray-50',
    hoverLight: 'hover:bg-gray-100',
    input: 'bg-white border-gray-300 text-gray-900',
    shadow: 'shadow-sm'
  };

  const renderOverview = () => (
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
                  style={{width: '24px', height: `${height}%`}}
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
                        style={{width: `${plugin.usage}%`}}
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

  const renderConversations = () => (
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
                <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                  conv.status === 'unread' ? `${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'}` :
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

  const renderPlugins = () => (
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
                <div className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                  plugin.status === 'active' ? `${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-600'}` : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}>
                  {plugin.status}
                </div>
              </div>
              
              <h4 className={`font-semibold ${baseClasses.text} mb-2`}>{plugin.name}</h4>
              <p className={`text-sm ${baseClasses.textSecondary} mb-4`}>Usage: {plugin.usage}%</p>
              <p className={`text-xs ${baseClasses.textMuted} mb-4`}>{plugin.installs.toLocaleString()} installs</p>
              
              <div className="flex space-x-2">
                <button className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  plugin.status === 'active' 
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

  const renderWorkflows = () => (
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
<p className={`text-sm ${baseClasses.textSecondary}`}>Trigger: &quot;{workflow.trigger}&quot;</p>                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${baseClasses.text}`}>{workflow.completions} completions</p>
                    <p className={`text-xs ${
                      workflow.status === 'active' ? 'text-green-600' : 
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
                    <button className={`p-2 transition-all duration-300 transform hover:scale-110 ${
                      workflow.status === 'active' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'
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

  return (
    <div className={`min-h-screen ${baseClasses.bg} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${baseClasses.headerBg} border-b ${baseClasses.border} px-6 py-4 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg ${baseClasses.hover} transition-colors duration-300`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Bot className="w-6 h-6" />
            </div>
            <h1 className={`text-xl font-bold ${baseClasses.text}`}>ChatBot Platform</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`w-5 h-5 ${baseClasses.textMuted} absolute left-3 top-1/2 transform -translate-y-1/2`} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className={`pl-10 pr-4 py-2 border ${baseClasses.border} ${baseClasses.input} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-all duration-300`}
              />
            </div>
            
            <button className={`p-2 ${baseClasses.textMuted} hover:text-blue-600 relative transition-all duration-300 transform hover:scale-110`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>

            <button 
              onClick={toggleDarkMode}
              className={`p-2 ${baseClasses.textMuted} hover:text-blue-600 rounded-lg ${baseClasses.hover} transition-all duration-300 transform hover:scale-110`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center space-x-3 p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className={`text-sm font-medium ${baseClasses.text}`}>John Doe</span>
                <ChevronDown className={`w-4 h-4 ${baseClasses.textMuted} transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showProfileMenu && (
                <div className={`absolute right-0 top-12 ${baseClasses.cardBg} border ${baseClasses.border} rounded-lg shadow-lg py-2 w-48 z-50`}>
                  {[
                    { icon: User, label: 'Profile' },
                    { icon: CreditCard, label: 'Billing' },
                    { icon: Key, label: 'API Keys' }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <a 
                        key={index}
                        href="#" 
                        className={`flex items-center space-x-2 px-4 py-2 ${baseClasses.text} ${baseClasses.hover} transition-all duration-300`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                  <hr className={`my-2 ${baseClasses.border}`} />
                  <a href="#" className={`flex items-center space-x-2 px-4 py-2 text-red-600 ${baseClasses.hover} transition-all duration-300`}>
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 ${baseClasses.sidebarBg} border-r ${baseClasses.border} px-4 py-6 transition-all duration-300 overflow-hidden`}>
          <div className="space-y-2">
            {[
              { key: 'overview', icon: BarChart3, label: 'Overview' },
              { key: 'conversations', icon: MessageSquare, label: 'Conversations' },
              { key: 'plugins', icon: Zap, label: 'Plugins' },
              { key: 'workflows', icon: Workflow, label: 'Workflows' },
              { key: 'settings', icon: Settings, label: 'Settings' }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => item.key !== 'settings' && setActiveTab(item.key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                    activeTab === item.key 
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

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'conversations' && renderConversations()}
          {activeTab === 'plugins' && renderPlugins()}
          {activeTab === 'workflows' && renderWorkflows()}
        </main>
      </div>
    </div>
  );
};

export default ChatbotDashboard;