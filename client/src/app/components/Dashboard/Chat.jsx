// components/Dashboard/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  User,
  MessageCircle,
  Instagram,
  Globe,
  Bot,
  CheckCheck,
  Check
} from 'lucide-react';

const Chat = ({ selectedConversation, onBackToConversations, baseClasses, darkMode }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample messages for the selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const sampleMessages = [
        {
          id: 1,
          text: selectedConversation.preview,
          sender: 'user',
          timestamp: '10:30 AM',
          status: 'delivered'
        },
        {
          id: 2,
          text: "Hi! I'd be happy to help you with that. Let me check the details for you.",
          sender: 'bot',
          timestamp: '10:31 AM',
          status: 'delivered'
        },
        {
          id: 3,
          text: "Thank you for your quick response!",
          sender: 'user',
          timestamp: '10:32 AM',
          status: 'read'
        },
        {
          id: 4,
          text: "You're welcome! Is there anything specific you'd like to know?",
          sender: 'bot',
          timestamp: '10:33 AM',
          status: 'delivered'
        }
      ];
      setMessages(sampleMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate bot response after 2 seconds
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. Our team will get back to you shortly.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'website':
        return <Globe className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  if (!selectedConversation) {
    return (
      <div className={`${baseClasses.cardBg} rounded-xl ${baseClasses.shadow} ${baseClasses.borderLight} border h-full flex items-center justify-center`}>
        <div className="text-center">
          <MessageCircle className={`w-16 h-16 ${baseClasses.textMuted} mx-auto mb-4`} />
          <h3 className={`text-lg font-semibold ${baseClasses.text} mb-2`}>No Conversation Selected</h3>
          <p className={`${baseClasses.textSecondary}`}>Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses.cardBg} rounded-xl ${baseClasses.shadow} ${baseClasses.borderLight} border h-full flex flex-col`}>
      {/* Chat Header */}
      <div className={`p-4 border-b ${baseClasses.border} flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBackToConversations}
            className={`p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className={`w-10 h-10 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className={`font-semibold ${baseClasses.text}`}>{selectedConversation.user}</h3>
            <div className="flex items-center space-x-2">
              {getPlatformIcon(selectedConversation.platform)}
              <span className={`text-sm ${baseClasses.textSecondary} capitalize`}>
                {selectedConversation.platform}
              </span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className={`text-xs ${baseClasses.textSecondary}`}>Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className={`p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}>
            <Phone className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}>
            <Video className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}>
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : msg.sender === 'bot'
                ? `${darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800'}`
                : `${baseClasses.cardBg} border ${baseClasses.border}`
            }`}>
              {msg.sender === 'bot' && (
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-3 h-3" />
                  <span className="text-xs font-medium">Bot</span>
                </div>
              )}
              <p className="text-sm">{msg.text}</p>
              <div className={`flex items-center justify-end space-x-1 mt-1 ${
                msg.sender === 'user' ? 'text-blue-100' : baseClasses.textMuted
              }`}>
                <span className="text-xs">{msg.timestamp}</span>
                {msg.sender !== 'bot' && getMessageStatusIcon(msg.status)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={`p-4 border-t ${baseClasses.border}`}>
        <div className="flex items-end space-x-3">
          <button className={`p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}>
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className={`w-full px-3 py-2 border ${baseClasses.border} ${baseClasses.input} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300`}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          <button className={`p-2 rounded-lg ${baseClasses.hover} transition-all duration-300`}>
            <Smile className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-2 rounded-lg transition-all duration-300 ${
              message.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105' 
                : `${baseClasses.textMuted} cursor-not-allowed`
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;