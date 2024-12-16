import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle textarea auto-resize
  const handleTextareaResize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputText,
      timestamp: new Date().getTime()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Reset textarea height
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'inherit';
    }

    try {
      // Get response from Gemini
      const response = await sendMessageToGemini(inputText);
      
      // Add AI response
      const aiMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date().getTime() + 1
      };

      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = {
        type: 'ai',
        content: "I'm having trouble connecting to my systems. Please try again later! 🛸",
        timestamp: new Date().getTime() + 1
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <motion.div 
      className="flex items-start space-x-2 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-white text-sm">🤖</span>
      </div>
      <div className="bg-white/5 backdrop-blur-md p-3 rounded-2xl rounded-tl-none shadow-lg max-w-[80%] border border-white/10">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Messages Container */}
      <div 
        id="message-container"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <div className="flex flex-col">
          {messages.map((message) => (
            <motion.div 
              key={message.timestamp}
              className={`flex items-start space-x-2 mb-4 ${message.type === 'user' ? 'justify-end' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm">🤖</span>
                </div>
              )}
              
              <div 
                className={`p-3 rounded-2xl shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none ml-auto' 
                    : 'bg-white/5 backdrop-blur-md rounded-tl-none border border-white/10 text-blue-100'
                } max-w-[80%]`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm">👨‍🚀</span>
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-gray-900/30 backdrop-blur-lg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
            <textarea
              className="flex-1 p-2 bg-transparent border-none focus:ring-0 resize-none text-white min-h-[44px] max-h-[120px]"
              placeholder="Type your message..."
              rows="1"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleTextareaResize(e);
              }}
              onKeyDown={handleKeyPress}
            />
            <button 
              className="p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-4-4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
