
import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Button } from '@/components/atoms/Button';
import { MessageSquare, Search, ChevronDown, ChevronUp, Send, User, Bot } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'user' | 'bot'}[]>([
    { id: 1, text: "Hi! How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const faqs = [
    { q: "Where is my order?", a: "You can track your order in real-time by visiting the 'Orders' section in your profile or clicking the tracking link in your confirmation email." },
    { q: "How do I request a refund?", a: "If you have an issue with your order, please go to Order History, select the order, and click 'Report Issue'. Our team will review it within 24 hours." },
    { q: "Can I change my delivery address?", a: "You can change your address before a rider is assigned. Once a rider is assigned, please contact support immediately." },
    { q: "Do you accept cash?", a: "Yes, we accept Cash on Delivery as well as major credit cards." }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user' }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for reaching out. An agent will be with you shortly.", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-16">
           <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
           <div className="max-w-xl mx-auto relative">
             <input 
               type="text" 
               placeholder="Search for help..." 
               className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-brand-500 outline-none"
             />
             <Search className="absolute left-4 top-4 text-gray-400" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-fit">
             <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
               <MessageSquare size={24} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
             <p className="text-gray-500 mb-6">Our support team is available 24/7 to assist you with any issues.</p>
             <Button size="lg" className="w-full py-4" onClick={() => setChatOpen(true)}>
               Start Live Chat
             </Button>
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-brand-900 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full absolute bottom-0 right-0 border border-brand-900"></div>
                <Bot size={20} />
              </div>
              <span className="font-bold">Support Bot</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:text-gray-300">
              <ChevronDown size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-brand-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white rounded-b-2xl flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button type="submit" className="w-9 h-9 bg-brand-500 text-white rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SupportPage;
