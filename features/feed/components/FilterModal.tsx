
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  sortBy: string;
  priceRange: string[];
  dietary: string[];
  minRating: number | null;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const togglePrice = (price: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange.includes(price) 
        ? prev.priceRange.filter(p => p !== price)
        : [...prev.priceRange, price]
    }));
  };

  const toggleDietary = (diet: string) => {
    setFilters(prev => ({
      ...prev,
      dietary: prev.dietary.includes(diet) 
        ? prev.dietary.filter(d => d !== diet)
        : [...prev.dietary, diet]
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({ sortBy: 'recommended', priceRange: [], dietary: [], minRating: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* Sort By */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Sort By</h3>
            <div className="space-y-2">
              {['Recommended', 'Rating', 'Delivery Time', 'Price: Low to High'].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    filters.sortBy === opt.toLowerCase() ? 'border-brand-500' : 'border-gray-300'
                  }`}>
                    {filters.sortBy === opt.toLowerCase() && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full" />}
                  </div>
                  <span className={`text-sm ${filters.sortBy === opt.toLowerCase() ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {opt}
                  </span>
                  <input 
                    type="radio" 
                    name="sort" 
                    className="hidden" 
                    checked={filters.sortBy === opt.toLowerCase()} 
                    onChange={() => setFilters({...filters, sortBy: opt.toLowerCase()})} 
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Price Range</h3>
            <div className="flex gap-3">
              {['$', '$$', '$$$', '$$$$'].map((price) => (
                <button
                  key={price}
                  onClick={() => togglePrice(price)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    filters.priceRange.includes(price) 
                      ? 'bg-brand-50 border-brand-500 text-brand-600' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

           {/* Rating */}
           <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Min Rating</h3>
            <div className="flex gap-2">
              {[3.5, 4.0, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({...filters, minRating: filters.minRating === rating ? null : rating})}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    filters.minRating === rating 
                      ? 'bg-yellow-50 border-yellow-400 text-yellow-700' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {rating}+ Stars
                </button>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Dietary</h3>
            <div className="flex flex-wrap gap-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Paleo'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => toggleDietary(diet)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    filters.dietary.includes(diet)
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                  }`}
                >
                  {filters.dietary.includes(diet) && <Check size={12} className="inline mr-1" />}
                  {diet}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50">
          <Button variant="ghost" onClick={handleReset} className="flex-1">Reset</Button>
          <Button onClick={handleApply} className="flex-[2]">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};
