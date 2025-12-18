
import React, { useState } from 'react';
import { Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MealKit, MenuItem } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { useStore } from '@/store/useStore';
import { db } from '@/data/db';
import { ProductModal } from '@/components/molecules/ProductModal';

interface MealKitCardProps {
  item: MealKit;
}

export const MealKitCard: React.FC<MealKitCardProps> = ({ item }) => {
  const { addToCart, favorites, toggleFavorite } = useStore();
  const navigate = useNavigate();
  const isFavorite = favorites.includes(item.id);
  const [showModal, setShowModal] = useState(false);
  
  // Find associated chef if any
  const chef = item.chefId ? db.chefs.find(c => c.id === item.chefId) : null;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking buttons
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${item.id}`);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  // Adapter to convert MealKit to MenuItem for the modal
  const asMenuItem: MenuItem = {
    id: item.id,
    name: item.title,
    description: item.description,
    price: item.price,
    image: item.image,
    category: 'Meal Kit',
    options: [] // Meal kits might not have "options" like pizza toppings, but supports notes/qty
  };

  const handleAddToCart = (item: MenuItem, quantity: number, options: string[], notes: string) => {
    addToCart({
      id: item.id,
      title: item.name,
      price: item.price,
      image: item.image,
      quantity: quantity,
      selectedOptions: options,
      instructions: notes,
      restaurantName: 'To-Eat Meal Kits'
    });
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="flex-shrink-0 w-full bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group cursor-pointer relative"
      >
        <div className="relative h-48 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 left-3">
            {item.tags.map(tag => (
              <Badge key={tag} className="mr-1 shadow-sm bg-white/90 backdrop-blur-sm text-brand-600">
                {tag}
              </Badge>
            ))}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/70 text-gray-500 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-brand-500 transition-colors">{item.title}</h3>
          
          {chef && (
            <div className="flex items-center gap-2 mb-2" onClick={(e) => { e.stopPropagation(); navigate(`/chef/${chef.id}`); }}>
              <img src={chef.avatar} alt={chef.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="text-xs text-gray-500 hover:text-brand-600 transition-colors truncate">by {chef.name}</span>
            </div>
          )}

          <p className="text-gray-500 text-xs mb-3 line-clamp-2 h-8">{item.description}</p>
          
          <div className="flex items-center text-xs text-gray-500 mb-4">
            <Clock size={12} className="mr-1" />
            <span>Ready in {item.prepTime} minutes</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-gray-900">${item.price}</span>
            <Button size="sm" onClick={handleOpenModal} className="!py-1 !px-3 !text-xs rounded-lg z-10 relative">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <ProductModal 
        item={asMenuItem}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};
