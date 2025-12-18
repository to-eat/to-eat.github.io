
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, Bike } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { useStore } from '@/store/useStore';

interface ChatModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientRole: 'user' | 'rider';
}

export const ChatModal: React.FC<ChatModalProps> = ({ orderId, isOpen, onClose, recipientName, recipientRole }) => {
  const [text, setText] = useState('');
  const { chats, sendMessage } = useDataStore();
  const { user } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = chats.filter(c => c.orderId === orderId);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen || !user) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    sendMessage({
      orderId,
      senderId: user.id,
      senderName: user.name,
      role: user.role === 'rider' ? 'rider' : 'user',
      text: text
    });
    setText('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="bg-white w-full sm:max-w-md h-[80vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col relative pointer-events-auto animate-in slide-in-from-bottom-10">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${recipientRole === 'rider' ? 'bg-brand-100 text-brand-600' : 'bg-blue-100 text-blue-600'}`}>
              {recipientRole === 'rider' ? <Bike size={20} /> : <User size={20} />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{recipientName}</h3>
              <p className="text-xs text-green-600 font-medium">Online</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">Start the conversation...</p>
          ) : (
            messages.map(msg => {
              const isMe = msg.senderId === user.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                    isMe 
                      ? 'bg-brand-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-brand-100' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white rounded-b-2xl flex gap-2">
          <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={!text.trim()}
            className="w-11 h-11 bg-brand-500 text-white rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
