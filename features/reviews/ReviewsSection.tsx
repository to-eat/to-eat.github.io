
import React, { useMemo } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Review } from '@/types';
import { ReviewCard } from './components/ReviewCard';
import { Button } from '@/components/atoms/Button';

interface ReviewsSectionProps {
  reviews: Review[];
  targetName: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, targetName }) => {
  
  const stats = useMemo(() => {
    if (reviews.length === 0) return { average: 0, total: 0, distribution: [0,0,0,0,0] };
    
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / total).toFixed(1);
    
    const distribution = [5, 4, 3, 2, 1].map(star => {
      const count = reviews.filter(r => r.rating === star).length;
      return (count / total) * 100;
    });

    return { average, total, distribution };
  }, [reviews]);

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
        <Button variant="outline" size="sm" className="gap-2">
           <MessageSquare size={16} />
           Write a Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Stats Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="bg-gray-50 rounded-xl p-6 text-center mb-6">
            <span className="block text-5xl font-bold text-gray-900 mb-2">{stats.average}</span>
            <div className="flex justify-center gap-1 text-yellow-400 mb-2">
               {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.round(Number(stats.average)) ? "currentColor" : "none"} 
                    className={i < Math.round(Number(stats.average)) ? "" : "text-gray-300"}
                  />
               ))}
            </div>
            <p className="text-sm text-gray-500">{stats.total} verified reviews</p>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star, idx) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="font-bold text-gray-700 w-3">{star}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${stats.distribution[idx]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List Column */}
        <div className="md:col-span-8 lg:col-span-9">
          {reviews.length > 0 ? (
            <div>
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>No reviews yet for {targetName}. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};