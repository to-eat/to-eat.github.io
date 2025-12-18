
import React from 'react';
import { TrendingItem, Chef } from '@/types';
import { Flame, Crown } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  trending: TrendingItem[];
  chefs: Chef[];
}

export const Sidebar: React.FC<SidebarProps> = ({ trending, chefs }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Premium Widget */}
      <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-brand-200">
        <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <Crown size={24} className="text-white" />
        </div>
        <h3 className="font-bold text-lg mb-2">Go Premium</h3>
        <p className="text-brand-50 text-sm mb-6">Unlock exclusive recipes, priority delivery, and chef consultations.</p>
        <button className="w-full bg-white text-brand-600 font-bold py-2 rounded-xl text-sm hover:bg-brand-50 transition-colors">
          Upgrade Now
        </button>
      </div>

      {/* Trending Now */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">Trending Now</span>
        </h3>
        <div className="space-y-4">
          {trending.map(item => (
            <div key={item.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
              <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 truncate">{item.restaurant}</p>
              </div>
              <div className="flex items-center text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                <Flame size={10} className="mr-1" />
                {item.orders}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Chefs */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Top Chefs This Week</h3>
        <div className="space-y-4">
          {chefs.map(chef => (
            <div key={chef.id} className="flex items-center justify-between group cursor-pointer" onClick={() => navigate(`/chef/${chef.id}`)}>
              <div className="flex items-center gap-3">
                <img src={chef.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-brand-500 transition-all" alt={chef.name} />
                <div>
                  <h4 className="font-medium text-sm text-gray-900 group-hover:text-brand-500 transition-colors">{chef.name}</h4>
                  <p className="text-xs text-gray-500">{chef.specialty}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="!px-3 !py-1 !text-xs !h-7">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};