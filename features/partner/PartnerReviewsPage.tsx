
import React from 'react';
import { db } from '@/data/db';
import { Star, ThumbsUp, MessageSquare, CornerDownRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';

const PartnerReviewsPage: React.FC = () => {
  // Use mock reviews for the first restaurant
  const restaurantId = db.restaurants[0].id;
  const reviews = db.reviews.filter(r => r.targetId === restaurantId);

  const handleReply = (id: string) => {
    toast.success('Reply posted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
           <p className="text-gray-500 text-sm">Manage customer feedback and build your reputation.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <span className="text-gray-500 text-sm font-medium">Average Rating:</span>
          <div className="flex items-center gap-1 font-bold text-gray-900">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            4.8
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {reviews.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No reviews yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                     <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full object-cover" />
                     <div>
                       <h4 className="font-bold text-gray-900 text-sm">{review.userName}</h4>
                       <p className="text-xs text-gray-500">{review.date}</p>
                     </div>
                   </div>
                   <div className="flex text-yellow-400">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                     ))}
                   </div>
                 </div>

                 <p className="text-gray-700 text-sm leading-relaxed mb-4 pl-13">
                   {review.comment}
                 </p>

                 <div className="flex items-center gap-4 pl-13 mb-4">
                   <div className="flex items-center gap-1 text-xs text-gray-500">
                     <ThumbsUp size={14} /> {review.helpfulCount} Helpful
                   </div>
                 </div>

                 {/* Mock Reply Section */}
                 <div className="ml-12 bg-gray-50 rounded-xl p-4 border border-gray-100">
                   <div className="flex items-center gap-2 text-brand-600 text-xs font-bold mb-2">
                     <CornerDownRight size={14} />
                     Reply to {review.userName}
                   </div>
                   <textarea 
                     placeholder="Write a response..." 
                     className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 mb-2"
                     rows={2}
                   />
                   <div className="flex justify-end">
                     <Button size="sm" onClick={() => handleReply(review.id)}>Post Reply</Button>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerReviewsPage;
