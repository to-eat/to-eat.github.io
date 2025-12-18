
import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, ChevronRight, Utensils, User, ShoppingBag, Mic, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/useDataStore';
import { Button } from '@/components/atoms/Button';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { mealKits, restaurants, chefs } = useDataStore();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Search Logic
  const results = useMemo(() => {
    if (!query.trim()) return { meals: [], restaurants: [], chefs: [] };
    
    const lowerQ = query.toLowerCase();

    const meals = mealKits.filter(m => 
      m.title.toLowerCase().includes(lowerQ) || 
      m.description.toLowerCase().includes(lowerQ) ||
      m.tags.some(t => t.toLowerCase().includes(lowerQ))
    ).slice(0, 3);

    const filteredRestaurants = restaurants.filter(r => 
      r.name.toLowerCase().includes(lowerQ) || 
      r.cuisine.some(c => c.toLowerCase().includes(lowerQ))
    ).slice(0, 3);

    const filteredChefs = chefs.filter(c => 
      c.name.toLowerCase().includes(lowerQ) || 
      c.specialty.toLowerCase().includes(lowerQ)
    ).slice(0, 3);

    return { meals, restaurants: filteredRestaurants, chefs: filteredChefs };
  }, [query, mealKits, restaurants, chefs]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleVoiceSearch = () => {
    if (isListening) return;
    setIsListening(true);
    setQuery('');
    
    // Simulate voice recognition
    setTimeout(() => {
      setQuery('Chicken');
      setIsListening(false);
    }, 1500);
  };

  if (!isOpen) return null;

  const hasResults = results.meals.length > 0 || results.restaurants.length > 0 || results.chefs.length > 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-100">
          <Search className="text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder={isListening ? "Listening..." : "Search for meals, restaurants, or chefs..."}
            className="flex-1 text-lg outline-none placeholder:text-gray-400 text-gray-900 bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            disabled={isListening}
          />
          <button 
            onClick={handleVoiceSearch}
            className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'hover:bg-gray-100 text-gray-500'}`}
            title="Voice Search"
          >
            {isListening ? <Loader2 size={20} className="animate-spin" /> : <Mic size={20} />}
          </button>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-2">
          {!query && (
            <div className="p-8 text-center text-gray-400">
              <Search size={48} className="mx-auto mb-4 opacity-20" />
              <p>Type or use voice to start searching...</p>
            </div>
          )}

          {query && !hasResults && !isListening && (
             <div className="p-8 text-center text-gray-500">
               <p>No results found for "{query}"</p>
             </div>
          )}

          {/* Meals Results */}
          {results.meals.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 flex items-center gap-2">
                <ShoppingBag size={14} /> Meals
              </h3>
              {results.meals.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleNavigate(`/product/${item.id}`)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors mx-2"
                >
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-brand-600">{item.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-500" />
                </div>
              ))}
            </div>
          )}

          {/* Restaurants Results */}
          {results.restaurants.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 flex items-center gap-2">
                <Utensils size={14} /> Restaurants
              </h3>
              {results.restaurants.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleNavigate(`/restaurant/${item.id}`)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors mx-2"
                >
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-brand-600">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.cuisine.join(', ')}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-500" />
                </div>
              ))}
            </div>
          )}

          {/* Chefs Results */}
          {results.chefs.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2 flex items-center gap-2">
                <User size={14} /> Chefs
              </h3>
              {results.chefs.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleNavigate(`/chef/${item.id}`)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors mx-2"
                >
                  <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover bg-gray-100 border border-gray-200" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-brand-600">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.specialty}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-500" />
                </div>
              ))}
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
          Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};
