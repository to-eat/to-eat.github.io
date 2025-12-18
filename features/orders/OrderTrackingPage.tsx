
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ChefHat, Bike, MapPin, Home, Phone, MessageSquare, Star, Loader2, ThumbsUp, Utensils } from 'lucide-react';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { ReviewModal } from '@/features/reviews/components/ReviewModal';
import { ChatModal } from '@/components/molecules/ChatModal';

const OrderTrackingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, mealKits } = useDataStore();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Find real order from global state
  const order = orders.find(o => o.id === id);
  
  // Check if order contains cookable meal kits
  const cookableItems = order?.items.filter(item => mealKits.some(mk => mk.id === item.id)) || [];
  
  // Timeline Definitions
  const timeline = [
    { status: 'Placed', label: 'Order Placed', icon: Clock, desc: 'We have received your order.' },
    { status: 'Confirmed', label: 'Confirmed', icon: CheckCircle2, desc: 'Restaurant has accepted your order.' },
    { status: 'Preparing', label: 'Preparing', icon: ChefHat, desc: 'Chef is cooking your meal.' },
    { status: 'Rider Assigned', label: 'Rider Assigned', icon: Bike, desc: 'Mike is on the way to the restaurant.' },
    { status: 'Out for Delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your food is on the way to you!' },
    { status: 'Delivered', label: 'Delivered', icon: Home, desc: 'Enjoy your meal!' },
  ];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         <Navbar />
         <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <Loader2 className="animate-spin text-brand-500 mb-4" size={48} />
            <h2 className="text-xl font-bold">Loading Order...</h2>
            <p className="text-gray-500">If this takes too long, the order ID might be invalid.</p>
            <Button className="mt-4" onClick={() => navigate('/feed')}>Return Home</Button>
         </div>
      </div>
    );
  }

  // Determine current step index based on order status
  // Special handling for intermediate states
  const getStepStatus = (status: string) => {
      if (status === 'Ready') return 'Preparing'; 
      if (status === 'Picked Up') return 'Out for Delivery';
      return status;
  };

  const currentStepIndex = timeline.findIndex(t => t.status === getStepStatus(order.status));
  const currentStep = timeline[currentStepIndex] || timeline[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Order #{id}</p>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            {order.status === 'Delivered' ? 'Arrived!' : `Status: ${order.status}`}
          </h1>
          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
               <div className="bg-brand-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${((currentStepIndex + 1) / timeline.length) * 100}%` }}></div>
            </div>
          )}
        </div>

        {/* Live Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 bg-brand-50 border-b border-brand-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-600 shadow-sm animate-pulse">
               <currentStep.icon size={24} />
             </div>
             <div>
               <h2 className="font-bold text-lg text-brand-900">{currentStep.label}</h2>
               <p className="text-brand-700 text-sm">{currentStep.desc}</p>
             </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {timeline.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                
                return (
                  <div key={step.status} className="flex gap-4 relative">
                    {/* Vertical Line */}
                    {idx !== timeline.length - 1 && (
                      <div className={`absolute left-3.5 top-8 bottom-[-24px] w-0.5 ${isCompleted ? 'bg-brand-200' : 'bg-gray-100'}`} />
                    )}
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      isCompleted ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                    </div>
                    
                    <div className={`${isCompleted ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                      <h3 className="font-bold text-gray-900 text-sm">{step.label}</h3>
                      <p className="text-xs text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cook Mode Trigger */}
        {order.status === 'Delivered' && cookableItems.length > 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 mb-8 text-white flex items-center justify-between">
             <div>
               <h3 className="font-bold text-lg flex items-center gap-2">
                 <ChefHat size={20} /> Ready to Cook?
               </h3>
               <p className="text-orange-100 text-sm">You have {cookableItems.length} meal kit(s) waiting.</p>
             </div>
             <Button 
               className="bg-white text-orange-600 hover:bg-orange-50 border-none"
               onClick={() => navigate(`/cook/${order.id}/${cookableItems[0].id}`)}
             >
               Start Cooking <Utensils size={16} className="ml-2" />
             </Button>
          </div>
        )}

        {/* Rider Info (Visible when assigned) */}
        {currentStepIndex >= 3 && order.status !== 'Delivered' && (
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-in slide-in-from-bottom-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=33" alt="Rider" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Mike R.</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.9 • Yamaha NMAX
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <MessageSquare size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                    <Phone size={18} />
                  </button>
                </div>
             </div>
           </div>
        )}

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/feed')}>
            Back to Home
          </Button>
          
          {order.status === 'Delivered' ? (
             <Button className="flex-1 gap-2" onClick={() => setIsReviewOpen(true)}>
               <ThumbsUp size={18} /> Leave Review
             </Button>
          ) : (
             <Button className="flex-1" onClick={() => navigate('/support')}>
               Need Help?
             </Button>
          )}
        </div>

      </main>

      <ReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        order={order}
      />

      <ChatModal 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        orderId={order.id}
        recipientName="Mike R."
        recipientRole="rider"
      />
    </div>
  );
};

export default OrderTrackingPage;
