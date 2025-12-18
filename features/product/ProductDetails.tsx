
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Flame, ChefHat, ShoppingBag, ChevronRight, Share2 } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';
import { useStore } from '@/store/useStore';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { ReviewsSection } from '@/features/reviews/ReviewsSection';
import { toast } from 'sonner';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  
  // Use Global Store for consistency
  const { mealKits, chefs, reviews } = useDataStore();
  
  const product = mealKits.find((item) => item.id === id);
  const chef = product?.chefId ? chefs.find(c => c.id === product.chefId) : null;
  const productReviews = reviews.filter(r => r.targetId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${product?.title} on To-Eat!`,
          text: `I found this amazing meal kit by ${chef?.name}. Let's cook it!`,
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Product not found</p>
        <Button onClick={() => navigate('/feed')}>Back to Feed</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/feed')}
            className="flex items-center text-sm text-gray-500 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Feed
          </button>
          
          <button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-brand-600 transition-colors"
            title="Share"
          >
            <Share2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Image */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.tags.map(tag => (
                   <Badge key={tag} className="bg-white/90 backdrop-blur-md shadow-sm text-brand-700 font-bold px-3 py-1">
                     {tag}
                   </Badge>
                ))}
              </div>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <Clock className="mx-auto text-orange-500 mb-2" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Prep Time</p>
                <p className="font-bold text-gray-900">{product.prepTime} min</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Users className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Servings</p>
                <p className="font-bold text-gray-900">{product.servings} ppl</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Flame className="mx-auto text-green-500 mb-2" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Calories</p>
                <p className="font-bold text-gray-900">{product.nutrition?.calories || 'N/A'}</p>
              </div>
            </div>

            {/* Chef Widget */}
            {chef && (
              <div 
                onClick={() => navigate(`/chef/${chef.id}`)}
                className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <img src={chef.avatar} alt={chef.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Created By</p>
                  <h4 className="font-bold text-gray-900">{chef.name}</h4>
                  <p className="text-xs text-gray-600">{chef.specialty}</p>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.longDescription || product.description}
            </p>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat size={20} className="text-brand-500" />
                Fresh Ingredients Included
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {product.ingredients?.map((ing, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 text-sm bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mr-2" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutrition Breakdown */}
            <div className="mb-8 border-t border-b border-gray-100 py-6">
              <h3 className="font-bold text-gray-900 mb-4">Nutrition per Serving</h3>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Protein</p>
                  <p className="font-bold text-gray-900 text-lg">{product.nutrition?.protein}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Carbs</p>
                  <p className="font-bold text-gray-900 text-lg">{product.nutrition?.carbs}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Fats</p>
                  <p className="font-bold text-gray-900 text-lg">{product.nutrition?.fats}</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-auto bg-white sticky bottom-4 shadow-xl border border-gray-100 rounded-2xl p-4 flex items-center justify-between z-10">
               <div className="flex flex-col">
                 <span className="text-sm text-gray-500">Total Price</span>
                 <span className="font-serif text-3xl font-bold text-gray-900">${product.price}</span>
               </div>
               <Button 
                size="lg" 
                className="px-8 flex items-center gap-2"
                onClick={() => addToCart(product)}
               >
                 <ShoppingBag size={18} />
                 Add to Cart
               </Button>
            </div>

          </div>
        </div>

        <ReviewsSection reviews={productReviews} targetName={product.title} />

      </main>
    </div>
  );
};

export default ProductDetails;
