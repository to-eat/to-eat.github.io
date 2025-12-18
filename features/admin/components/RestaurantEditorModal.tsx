
import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Restaurant } from '@/types';

interface RestaurantEditorModalProps {
  restaurant?: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (restaurant: Restaurant) => void;
}

export const RestaurantEditorModal: React.FC<RestaurantEditorModalProps> = ({ restaurant, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Restaurant>>({
    name: '',
    cuisine: [],
    rating: 4.5,
    reviewCount: 0,
    distance: 0,
    deliveryTime: '20-30 min',
    priceRange: '$$',
    image: '',
    menu: []
  });

  const [cuisineInput, setCuisineInput] = useState('');

  useEffect(() => {
    if (restaurant) {
      setFormData(restaurant);
    } else {
      setFormData({
        name: '',
        cuisine: [],
        rating: 4.5,
        reviewCount: 0,
        distance: 1.5,
        deliveryTime: '25-35 min',
        priceRange: '$$',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
        menu: []
      });
    }
    setCuisineInput('');
  }, [restaurant, isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newRestaurant: Restaurant = {
      id: restaurant?.id || `r-${Date.now()}`,
      name: formData.name!,
      cuisine: formData.cuisine!,
      rating: formData.rating!,
      reviewCount: formData.reviewCount!,
      distance: formData.distance!,
      deliveryTime: formData.deliveryTime!,
      priceRange: formData.priceRange!,
      image: formData.image!,
      menu: formData.menu || []
    };
    onSave(newRestaurant);
    onClose();
  };

  const handleAddCuisine = () => {
    if (cuisineInput.trim()) {
      setFormData(prev => ({
        ...prev,
        cuisine: [...(prev.cuisine || []), cuisineInput.trim()]
      }));
      setCuisineInput('');
    }
  };

  const removeCuisine = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      cuisine: prev.cuisine?.filter(c => c !== tag)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">{restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
           
           <div className="flex gap-4">
             <div className="w-32 h-32 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 relative group">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageIcon className="text-white" />
                </div>
             </div>
             <div className="flex-1 space-y-2">
               <label className="block text-sm font-medium text-gray-700">Image URL</label>
               <input 
                 type="text" 
                 value={formData.image}
                 onChange={e => setFormData({...formData, image: e.target.value})}
                 className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                 placeholder="https://..."
               />
               <p className="text-xs text-gray-400">Enter a valid image URL for the banner/thumbnail.</p>
             </div>
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                <input 
                  type="text" 
                  value={formData.deliveryTime}
                  onChange={e => setFormData({...formData, deliveryTime: e.target.value})}
                  placeholder="20-30 min"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select 
                  value={formData.priceRange}
                  onChange={e => setFormData({...formData, priceRange: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option>$</option>
                  <option>$$</option>
                  <option>$$$</option>
                  <option>$$$$</option>
                </select>
             </div>
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisines / Categories</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {formData.cuisine?.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-brand-50 text-brand-700 rounded-md text-xs font-bold flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeCuisine(tag)} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={cuisineInput}
                  onChange={e => setCuisineInput(e.target.value)}
                  placeholder="Add cuisine (e.g. Italian)"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCuisine())}
                />
                <Button type="button" variant="secondary" onClick={handleAddCuisine}>Add</Button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance (miles)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.distance}
                  onChange={e => setFormData({...formData, distance: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Rating</label>
                <input 
                  type="number" 
                  step="0.1"
                  max="5"
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                />
             </div>
           </div>

        </form>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleSave} className="gap-2">
            <Save size={16} /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
