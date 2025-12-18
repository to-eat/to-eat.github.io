import React from 'react';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '@/types';
import { useStore } from '@/store/useStore';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(restaurant.id);

  return (
    <div 
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        navigate(`/restaurant/${restaurant.id}`)
      }}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
          <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-xs font-bold text-gray-800">{restaurant.rating}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(restaurant.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/70 text-gray-500 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 group-hover:text-brand-500 transition-colors">{restaurant.name}</h3>
        </div>
        <p className="text-xs text-gray-500 mb-3">{restaurant.cuisine.join(' • ')}</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
          <div className="flex items-center">
            <MapPin size={12} className="mr-1 text-gray-400" />
            {restaurant.distance} mi
          </div>
          <div className="flex items-center">
            <Clock size={12} className="mr-1 text-gray-400" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center text-green-600 font-medium ml-auto">
            {restaurant.priceRange}
          </div>
        </div>
      </div>
    </div>
  );
};