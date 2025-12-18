
import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <img 
            src={review.userAvatar} 
            alt={review.userName} 
            className="w-10 h-10 rounded-full object-cover" 
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{review.userName}</h4>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < review.rating ? "currentColor" : "none"} 
              className={i < review.rating ? "" : "text-gray-300"} 
            />
          ))}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4 pl-13">
        {review.comment}
      </p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <button className="flex items-center gap-1 hover:text-brand-600 transition-colors">
          <ThumbsUp size={14} />
          Helpful ({review.helpfulCount})
        </button>
      </div>
    </div>
  );
};