// components/Dashboard/ChatbotDashboard.js
'use client'
import React, { useState, useEffect } from 'react';

// Import components
import Header from './Header';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Conversations from './Conversations';
import Plugins from './Plugins';
import Workflows from './Workflows';

// Import data and utils
import { channels, plugins, conversations, workflows } from '../../data/dashboardData';
import { getBaseClasses } from '../../utils/themeUtils';

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

    const baseClasses = getBaseClasses(darkMode);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <Overview
                        darkMode={darkMode}
                        channels={channels}
                        plugins={plugins}
                        baseClasses={baseClasses}
                    />
                );
            case 'conversations':
                return (
                    <Conversations
                        selectedChannel={selectedChannel}
                        setSelectedChannel={setSelectedChannel}
                        conversations={conversations}
                        baseClasses={baseClasses}
                        darkMode={darkMode}
                    />
                );
            case 'plugins':
                return (
                    <Plugins
                        plugins={plugins}
                        baseClasses={baseClasses}
                        darkMode={darkMode}
                    />
                );
            case 'workflows':
                return (
                    <Workflows
                        workflows={workflows}
                        baseClasses={baseClasses}
                        darkMode={darkMode}
                    />
                );
            default:
                return (
                    <Overview
                        darkMode={darkMode}
                        channels={channels}
                        plugins={plugins}
                        baseClasses={baseClasses}
                    />
                );
        }
    };

    return (
        <div className={`min-h-screen ${baseClasses.bg} transition-colors duration-300`}>
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                showProfileMenu={showProfileMenu}
                setShowProfileMenu={setShowProfileMenu}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                baseClasses={baseClasses}
            />

            <div className="flex">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarOpen={sidebarOpen}
                    baseClasses={baseClasses}
                    darkMode={darkMode}
                />

                <main className="flex-1 p-6 overflow-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default ChatbotDashboard;