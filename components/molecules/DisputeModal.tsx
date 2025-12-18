
import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { Order } from '@/types';
import { toast } from 'sonner';

interface DisputeModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ order, isOpen, onClose }) => {
  const { fileDispute } = useDataStore();
  const [reason, setReason] = useState('Missing Items');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fileDispute(order.id, `${reason}: ${details}`);
    toast.success('Issue reported. Our support team will review it shortly.');
    onClose();
  };

  const reasons = ['Missing Items', 'Wrong Order', 'Poor Quality', 'Never Arrived', 'Damaged Packaging'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 animate-in zoom-in-95 p-6">
        <div className="flex justify-between items-center mb-6">
           <div className="flex items-center gap-2 text-red-600">
             <AlertTriangle size={24} />
             <h2 className="text-xl font-bold text-gray-900">Report Issue</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
             <X size={20} />
           </button>
        </div>

        <div className="mb-4 text-sm text-gray-500">
          Order #{order.id.split('-')[1]} from {order.items[0]?.restaurantName}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What went wrong?</label>
            <div className="flex flex-wrap gap-2">
              {reasons.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setReason(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    reason === r 
                      ? 'bg-red-50 border-red-500 text-red-700' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
            <textarea
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Please provide more details..."
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm min-h-[100px]"
            />
          </div>

          <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 border-transparent text-white">
            Submit Report
          </Button>
        </form>
      </div>
    </div>
  );
};
