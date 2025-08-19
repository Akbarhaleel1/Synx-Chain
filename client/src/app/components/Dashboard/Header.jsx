// components/Dashboard/Header.js
import React from 'react';
import {
    Bot,
    Search,
    Bell,
    User,
    ChevronDown,
    Moon,
    Sun,
    Menu,
    X,
    CreditCard,
    Key,
    LogOut
} from 'lucide-react';

const Header = ({
    sidebarOpen,
    setSidebarOpen,
    showProfileMenu,
    setShowProfileMenu,
    darkMode,
    toggleDarkMode,
    baseClasses
}) => {
    return (
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
    );
};

export default Header;