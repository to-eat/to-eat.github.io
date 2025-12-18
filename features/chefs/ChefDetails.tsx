
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Star, Award, ChefHat } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { MealKitCard } from '@/features/feed/components/MealKitCard';

const ChefDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chefs, mealKits } = useDataStore();
  
  const chef = chefs.find(c => c.id === id);
  const chefRecipes = mealKits.filter(kit => kit.chefId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!chef) return <div>Chef not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Profile */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={() => navigate('/chefs')}
            className="flex items-center text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Chefs
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0">
              <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                   <h1 className="font-serif text-3xl font-bold text-gray-900">{chef.name}</h1>
                   <p className="text-brand-600 font-medium text-lg">{chef.specialty}</p>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <Button>Follow</Button>
                  <Button variant="outline">Message</Button>
                </div>
              </div>
              
              <p className="text-gray-600 max-w-2xl mb-6">{chef.bio}</p>
              
              <div className="flex justify-center md:justify-start gap-8 border-t border-gray-100 pt-6">
                <div className="text-center md:text-left">
                  <p className="font-bold text-gray-900 text-xl">{chef.followerCount}</p>
                  <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
                    <Users size={14} /> Followers
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <p className="font-bold text-gray-900 text-xl">{chef.rating}</p>
                  <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
                    <Star size={14} /> Rating
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <p className="font-bold text-gray-900 text-xl">{chefRecipes.length}</p>
                  <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
                    <ChefHat size={14} /> Recipes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <Award className="text-brand-500" />
          <h2 className="font-serif text-2xl font-bold text-gray-900">Signature Meal Kits</h2>
        </div>

        {chefRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chefRecipes.map(kit => (
              <MealKitCard key={kit.id} item={kit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">No recipes available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChefDetails;
