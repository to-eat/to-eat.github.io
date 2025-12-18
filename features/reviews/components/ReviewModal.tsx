
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { useStore } from '@/store/useStore';
import { Review, Order } from '@/types';
import { toast } from 'sonner';

interface ReviewModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ order, isOpen, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { addReview } = useDataStore();
  const { user } = useStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Create a new review
    const newReview: Review = {
      id: `rv-${Date.now()}`,
      targetId: order.restaurantId || 'unknown', // Linking review to restaurant for now
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: rating,
      date: 'Just now',
      comment: comment,
      helpfulCount: 0
    };

    addReview(newReview);
    toast.success('Review submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 animate-in zoom-in-95 p-6">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-gray-900">Rate your Order</h2>
           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6 gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star 
                  size={32} 
                  fill={star <= rating ? "#FACC15" : "none"} 
                  className={star <= rating ? "text-yellow-400" : "text-gray-300"} 
                />
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Write a Review</label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the food? How was the delivery?"
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm min-h-[100px]"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
};
