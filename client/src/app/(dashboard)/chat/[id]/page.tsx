'use client'

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { Send, Phone, User, Bot, MessageCircle, Settings } from 'lucide-react';

interface Message {
  from: string;
  to: string;
  body: string;
  direction: 'inbound' | 'outbound';
  timestamp?: string;
}

let socket: Socket;

const WhatsAppChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [recipient, setRecipient] = useState(''); // test number
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    setRecipient('whatsapp:+917356667616')
    console.log('use effect is working')
    socket = io('http://localhost:5000'); // backend URL
    console.log('use effect is working 2')
    console.log('socket 1', socket)

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
      setIsConnected(true);
      socket.emit('join-room', 'admin-room');
    });
        console.log('socket 2', socket)

    console.log('use effect is working 3')

    socket.on('disconnect', () => {
      setIsConnected(false);
    });
        console.log('use effect is working 4')


    socket.on('new-whatsapp-message', (msg: Message) => {
      // Add timestamp if not present
      const messageWithTimestamp = {
        ...msg,
        timestamp: msg.timestamp || new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, messageWithTimestamp]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      console.log('sendMessage funtion trigger')
      const response = await axios.post('http://localhost:5000/plugins/whatsapp/send', {
        to: recipient,
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: { '1': input, '2': '3pm' }, 
      });
      console.log('response', response)
      // Add the sent message to the chat
      const sentMessage: Message = {
        from: 'bot',
        to: recipient,
        body: input,
        direction: 'outbound',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages((prev) => [...prev, sentMessage]);
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat</h1>
            <p className="text-gray-500 dark:text-gray-300">Live chat dashboard</p>
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {recipient.replace('whatsapp:', '')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp Contact</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Start a conversation</p>
              </div>
            </div>
          ) : (
            messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.direction === 'outbound'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.direction === 'outbound' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.direction === 'outbound' ? 'Bot' : 'User'}
                    </span>
                  </div>
                  <p className="text-sm">{message.body}</p>
                  {message.timestamp && (
                    <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Sending...' : 'Send'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Sent Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.direction === 'outbound').length}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Send className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Received Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.direction === 'inbound').length}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;