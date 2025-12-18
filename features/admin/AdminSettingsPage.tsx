
import React from 'react';
import { useForm } from 'react-hook-form';
import { Save, Globe, CreditCard, Mail } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';

const AdminSettingsPage: React.FC = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      appName: 'To-Eat',
      supportEmail: 'support@to-eat.com',
      platformFee: '10',
      taxRate: '8',
      deliveryBaseFee: '2.99',
      currency: 'USD ($)',
    }
  });

  const onSubmit = (data: any) => {
    toast.success('Platform settings updated successfully');
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-500 text-sm">Configure global variables and application preferences.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* General Settings */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <Globe className="text-brand-500" />
            <h2 className="font-bold text-lg text-gray-900">General Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Application Name</label>
               <input {...register('appName')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
               <select {...register('currency')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                 <option>USD ($)</option>
                 <option>EUR (€)</option>
                 <option>EGP (E£)</option>
               </select>
            </div>
            <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
               <div className="relative">
                 <Mail size={18} className="absolute left-3 top-2.5 text-gray-400" />
                 <input {...register('supportEmail')} className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
               </div>
            </div>
          </div>
        </section>

        {/* Financial Settings */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <CreditCard className="text-green-600" />
            <h2 className="font-bold text-lg text-gray-900">Financial Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Platform Commission (%)</label>
               <input type="number" {...register('platformFee')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
               <p className="text-xs text-gray-400 mt-1">Charged to restaurants per order.</p>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Global Tax Rate (%)</label>
               <input type="number" {...register('taxRate')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Base Delivery Fee</label>
               <input type="number" step="0.01" {...register('deliveryBaseFee')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
        </section>

        <div className="flex justify-end sticky bottom-6 z-10">
          <Button type="submit" size="lg" className="flex items-center gap-2 shadow-xl">
            <Save size={18} />
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
