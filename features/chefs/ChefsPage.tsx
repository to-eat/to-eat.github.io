
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ChevronRight } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';

const ChefsPage: React.FC = () => {
  const navigate = useNavigate();
  const chefs = useDataStore((state) => state.chefs);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Meet Our Master Chefs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the culinary minds behind your favorite meal kits. Follow them for exclusive recipes, 
            cooking tips, and personalized meal plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <div key={chef.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group">
              <div className="relative h-48">
                <img src={chef.coverImage || chef.avatar} alt={chef.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              <div className="pt-12 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-900">{chef.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    {chef.rating}
                  </div>
                </div>
                
                <p className="text-brand-600 font-medium text-sm mb-4">{chef.specialty}</p>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
                  {chef.bio}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users size={16} />
                    {chef.followerCount} followers
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200"
                    onClick={() => navigate(`/chef/${chef.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChefsPage;
