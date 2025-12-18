import React from 'react';
import { Check, Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check size={48} className="text-green-600" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-gray-500 max-w-md mb-8 text-lg">
        Thank you for your order. We're prepping your ingredients now. You'll receive a confirmation email shortly.
      </p>
      
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm mb-8 text-left">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Order Number</span>
          <span className="font-mono font-bold text-gray-900">#TE-88392</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Est. Delivery</span>
          <span className="font-medium text-gray-900">35 - 45 mins</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate('/feed')}>
          <Home size={18} className="mr-2" />
          Back to Home
        </Button>
        <Button onClick={() => navigate('/feed')}>
          Track Order
          <ChevronRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};