
import React, { useState } from 'react';
import { X, Minus, Plus, ChefHat } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { MenuItem } from '@/types';

interface ProductModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: string[], notes: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  // Mock options if none exist on the item for demonstration
  const options = item.options || [
    { name: 'Extra Cheese', price: 1.50 },
    { name: 'Spicy Sauce', price: 0.50 },
    { name: 'No Onion', price: 0.00 },
  ];

  const handleOptionToggle = (optionName: string) => {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter(o => o !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  const calculateTotal = () => {
    const optionsCost = selectedOptions.reduce((acc, optName) => {
      const opt = options.find(o => o.name === optName);
      return acc + (opt?.price || 0);
    }, 0);
    return (item.price + optionsCost) * quantity;
  };

  const handleSubmit = () => {
    onAddToCart(item, quantity, selectedOptions, notes);
    // Reset state
    setQuantity(1);
    setSelectedOptions([]);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Image */}
        <div className="relative h-48 shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Options */}
          <div className="mb-6">
             <h3 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">Customize</h3>
             <div className="space-y-3">
               {options.map((opt) => (
                 <label key={opt.name} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                   <div className="flex items-center gap-3">
                     <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedOptions.includes(opt.name) ? 'bg-brand-500 border-brand-500' : 'border-gray-300'}`}>
                       {selectedOptions.includes(opt.name) && <div className="w-2 h-2 bg-white rounded-full" />}
                     </div>
                     <span className="text-gray-700 font-medium text-sm">{opt.name}</span>
                   </div>
                   <span className="text-gray-500 text-sm">{opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'Free'}</span>
                   <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedOptions.includes(opt.name)}
                    onChange={() => handleOptionToggle(opt.name)}
                   />
                 </label>
               ))}
             </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide flex items-center gap-2">
              <ChefHat size={16} className="text-brand-500" />
              Special Instructions
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies? Extra napkins? Let us know..."
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm min-h-[80px]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1.5 shadow-sm">
               <button 
                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
                 className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
               >
                 <Minus size={16} />
               </button>
               <span className="font-bold text-gray-900 w-4 text-center">{quantity}</span>
               <button 
                 onClick={() => setQuantity(quantity + 1)}
                 className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
               >
                 <Plus size={16} />
               </button>
            </div>
            
            <Button 
              className="flex-1 py-3 text-base flex justify-between items-center px-6" 
              onClick={handleSubmit}
            >
              <span>Add to Order</span>
              <span className="bg-brand-700/30 px-2 py-1 rounded text-xs">
                ${calculateTotal().toFixed(2)}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
