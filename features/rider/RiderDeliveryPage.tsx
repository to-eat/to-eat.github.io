
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Phone, MessageSquare, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';
import { useDataStore } from '@/store/useDataStore';
import { ChatModal } from '@/components/molecules/ChatModal';

const RiderDeliveryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders, updateOrderStatus } = useDataStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const order = orders.find(o => o.id === id);
  
  // Local state to manage UI flow, syncing with global order status where possible
  const [step, setStep] = useState<'pickup' | 'dropoff'>('pickup');
  const [localStatus, setLocalStatus] = useState<'assigned' | 'arriving_pickup' | 'arrived_pickup' | 'picked_up' | 'arriving_dropoff' | 'delivered'>('assigned');

  // Sync initial state with order status
  useEffect(() => {
    if (order) {
      if (order.status === 'Out for Delivery') {
        setStep('dropoff');
        setLocalStatus('arriving_dropoff');
      } else if (order.status === 'Picked Up') {
        setStep('dropoff');
        setLocalStatus('arriving_dropoff');
      } else if (order.status === 'Delivered') {
        setLocalStatus('delivered');
      }
    }
  }, [order]);

  if (!order) {
    return <div className="p-8 text-center">Order not found</div>;
  }

  const handleAction = () => {
    // 1. Driving to Restaurant -> Arrived at Restaurant
    if (step === 'pickup' && localStatus === 'assigned') {
      setLocalStatus('arrived_pickup');
      toast.success("Marked as Arrived at Restaurant");
      // Optional: You could add a status like 'Rider Arrived' if supported by types
    } 
    // 2. Arrived -> Picked Up (Sync with Global)
    else if (step === 'pickup' && localStatus === 'arrived_pickup') {
      updateOrderStatus(order.id, 'Picked Up'); // Updates Global
      // Immediately transition to Out for Delivery for flow
      setTimeout(() => {
        updateOrderStatus(order.id, 'Out for Delivery');
      }, 1000);
      
      setStep('dropoff');
      setLocalStatus('arriving_dropoff');
      toast.success("Order Picked Up");
    } 
    // 3. Driving to Customer -> Delivered (Sync with Global)
    else if (step === 'dropoff') {
       updateOrderStatus(order.id, 'Delivered'); // Updates Global
       setLocalStatus('delivered');
       toast.success("Order Delivered!");
       setTimeout(() => navigate('/rider/dashboard'), 1500);
    }
  };

  const getButtonText = () => {
    if (step === 'pickup') {
      if (localStatus === 'assigned') return 'Arrived at Restaurant';
      return 'Confirm Pickup';
    }
    return 'Confirm Delivery';
  };

  return (
    <div className="flex flex-col h-full absolute inset-0 bg-white">
      {/* Map Placeholder */}
      <div className="flex-1 bg-gray-100 relative min-h-[50%]">
        {/* Mock Map UI */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
             <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute inset-0"></div>
             <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-10 relative">
               <Navigation size={32} className="text-brand-600 fill-brand-600" />
             </div>
          </div>
        </div>

        {/* Route Line Mock */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           <path d="M100,100 Q200,300 300,500" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="10,5" />
        </svg>

        <button 
          onClick={() => navigate('/rider/dashboard')}
          className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg z-20 hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg z-20 text-sm font-bold text-gray-800">
          Est. 12 mins
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.1)] p-6 relative z-20 animate-in slide-in-from-bottom-10">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-1">
              {step === 'pickup' ? `Pick up at ${order.items[0]?.restaurantName || 'Restaurant'}` : `Drop off to ${order.customerName}`}
            </h2>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin size={14} />
              {step === 'pickup' ? 'Downtown, Cairo' : (order.deliveryAddress || 'Customer Address')}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <MessageSquare size={20} />
            </button>
            <button className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors">
              <Phone size={20} />
            </button>
          </div>
        </div>

        {/* Order Details Preview */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Order Items</p>
           <div className="space-y-2 max-h-32 overflow-y-auto">
             {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-xs bg-white px-2 py-1 border border-gray-200 rounded text-brand-600">{item.quantity}x</div>
                    <span className="text-sm text-gray-800 font-medium">{item.title}</span>
                  </div>
                </div>
             ))}
           </div>
        </div>

        <Button 
          size="lg" 
          className={`w-full py-4 text-lg font-bold shadow-xl shadow-brand-500/20 transition-all ${
            step === 'dropoff' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : ''
          }`}
          onClick={handleAction}
        >
          {getButtonText()}
        </Button>
      </div>

      <ChatModal 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        orderId={order.id}
        recipientName={order.customerName}
        recipientRole="user"
      />
    </div>
  );
};

export default RiderDeliveryPage;
