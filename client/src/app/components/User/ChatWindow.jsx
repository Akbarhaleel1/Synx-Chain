'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  X, 
  Bot, 
  User, 
  Paperclip, 
  Smile,
  ChevronDown,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to our website. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['Book a service', 'Check pricing', 'Contact support', 'Learn more']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 24, y: 24 }); // Default bottom-right position
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Track window size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateWindowSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      // Set initial size
      updateWindowSize();
      
      // Add resize listener
      window.addEventListener('resize', updateWindowSize);
      
      return () => window.removeEventListener('resize', updateWindowSize);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const botResponses = {
    'book': "I'd be happy to help you book a service! What type of service are you looking for?",
    'pricing': "Our pricing varies based on your needs. Here are our main packages:\n\n💼 Starter: $29/month\n🚀 Professional: $79/month\n⭐ Enterprise: $199/month\n\nWould you like more details about any package?",
    'support': "I'm here to help! You can also reach our support team at support@company.com or call us at (555) 123-4567. What specific issue can I assist you with?",
    'hours': "We're open Monday-Friday 9 AM to 6 PM EST. Our chatbot is available 24/7 to help with basic questions!",
    'hello': "Hello! Great to meet you! How can I assist you today?",
    'help': "I'm here to help! I can assist you with:\n\n• Booking services\n• Pricing information\n• Technical support\n• General questions\n\nWhat would you like to know?",
    'thanks': "You're very welcome! Is there anything else I can help you with today?",
    'default': "I understand you're asking about that. Let me connect you with a human agent who can provide more detailed assistance. Would you like me to do that?"
  };

  const handleSendMessage = (messageText = message) => {
    if (messageText.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        text: messageText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setMessage('');

      // Show typing indicator
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = getBotResponse(messageText.toLowerCase());
        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...(messageText.toLowerCase().includes('book') && {
            suggestions: ['Schedule consultation', 'View available times', 'Talk to agent']
          })
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);
    }
  };

  const getBotResponse = (userMessage) => {
    if (userMessage.includes('book') || userMessage.includes('schedule')) return botResponses.book;
    if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('pricing')) return botResponses.pricing;
    if (userMessage.includes('support') || userMessage.includes('problem') || userMessage.includes('issue')) return botResponses.support;
    if (userMessage.includes('hours') || userMessage.includes('open') || userMessage.includes('time')) return botResponses.hours;
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) return botResponses.hello;
    if (userMessage.includes('help')) return botResponses.help;
    if (userMessage.includes('thank') || userMessage.includes('thanks')) return botResponses.thanks;
    return botResponses.default;
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  // Drag functionality
  const handleMouseDown = (e) => {
    if (isOpen) return; // Don't drag when chat is open
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Prevent text selection during drag
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || windowSize.width === 0) return;
    
    // Calculate new position
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Get viewport dimensions
    const viewportWidth = windowSize.width;
    const viewportHeight = windowSize.height;
    const buttonSize = 64; // Approximate button size
    
    // Constrain to viewport bounds
    const constrainedX = Math.max(0, Math.min(newX, viewportWidth - buttonSize));
    const constrainedY = Math.max(0, Math.min(newY, viewportHeight - buttonSize));
    
    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    if (isDragging && windowSize.width > 0) {
      setIsDragging(false);
      
      // Snap to edges for better UX
      const viewportWidth = windowSize.width;
      const viewportHeight = windowSize.height;
      const snapThreshold = 50;
      const buttonSize = 64;
      
      let finalX = position.x;
      let finalY = position.y;
      
      // Snap to left or right edge
      if (position.x < snapThreshold) {
        finalX = 24;
      } else if (position.x > viewportWidth - buttonSize - snapThreshold) {
        finalX = viewportWidth - buttonSize - 24;
      }
      
      // Snap to top or bottom edge
      if (position.y < snapThreshold) {
        finalY = 24;
      } else if (position.y > viewportHeight - buttonSize - snapThreshold) {
        finalY = viewportHeight - buttonSize - 24;
      }
      
      setPosition({ x: finalX, y: finalY });
    }
  };

  // Add mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, position, windowSize]);

  // Touch support for mobile
  const handleTouchStart = (e) => {
    if (isOpen) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || windowSize.width === 0) return;
    
    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    
    const viewportWidth = windowSize.width;
    const viewportHeight = windowSize.height;
    const buttonSize = 64;
    
    const constrainedX = Math.max(0, Math.min(newX, viewportWidth - buttonSize));
    const constrainedY = Math.max(0, Math.min(newY, viewportHeight - buttonSize));
    
    setPosition({ x: constrainedX, y: constrainedY });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ContactForm = () => (
    <div className="p-4 bg-gray-50 border-t">
      <h4 className="font-semibold text-gray-800 mb-3">Get in touch</h4>
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Your name" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input 
          type="email" 
          placeholder="Email address" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea 
          placeholder="Your message" 
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowContactForm(false)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );

  // Calculate position styles safely
  const getPositionStyles = () => {
    if (typeof window === 'undefined' || windowSize.width === 0) {
      return {
        right: '24px',
        bottom: '24px',
        left: 'auto',
        top: 'auto'
      };
    }

    return {
      right: isOpen ? '24px' : `${windowSize.width - position.x - 64}px`,
      bottom: isOpen ? '24px' : `${windowSize.height - position.y - 64}px`,
      left: 'auto',
      top: 'auto'
    };
  };

  return (
    <div 
      ref={chatContainerRef}
      className="fixed z-50 font-sans"
      style={getPositionStyles()}
    >
      {/* Chat Button */}
      {!isOpen && (
        <button
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => !isDragging && setIsOpen(true)}
          className={`bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
            isDragging ? 'cursor-grabbing scale-110 animate-none' : 'cursor-grab hover:scale-110 animate-pulse'
          } select-none`}
          style={{
            transform: isDragging ? 'rotate(5deg)' : 'none',
            boxShadow: isDragging ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : undefined
          }}
        >
          <MessageCircle className="w-6 h-6 pointer-events-none" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-96 md:h-[500px]'
        } w-80 md:w-96`}>
          
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Support Assistant</h3>
                <p className="text-xs text-blue-100">Usually replies in a few minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                {isMinimized ? <ChevronDown className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="h-64 md:h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border'
                    }`}>
                      {msg.sender === 'bot' && (
                        <div className="flex items-center space-x-2 mb-1">
                          <Bot className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">Assistant</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Suggestions */}
                {messages.length > 0 && messages[messages.length - 1].suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Contact Form */}
              {showContactForm && <ContactForm />}

              {/* Quick Actions */}
              {!showContactForm && (
                <div className="px-4 py-2 border-t bg-gray-50">
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => setShowContactForm(true)}
                      className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Contact</span>
                    </button>
                    <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors">
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </button>
                    <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors">
                      <Clock className="w-3 h-3" />
                      <span>Hours</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              {!showContactForm && (
                <div className="p-4 border-t bg-white rounded-b-lg">
                  <div className="flex items-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        rows={1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                        style={{ minHeight: '36px', maxHeight: '100px' }}
                      />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Smile className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleSendMessage()}
                      disabled={!message.trim()}
                      className={`p-2 rounded-lg transition-colors ${
                        message.trim() 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105' 
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    We typically reply in a few minutes
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;