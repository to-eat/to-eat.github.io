
import React from 'react';
import { useForm } from 'react-hook-form';
import { Store, Clock, MapPin, Save } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { db } from '@/data/db';
import { toast } from 'sonner';

const PartnerSettingsPage: React.FC = () => {
  const restaurant = db.restaurants[0];
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: restaurant.name,
      description: 'Authentic Egyptian cuisine served with love.',
      phone: '+20 123 456 7890',
      address: 'Downtown, Cairo, Egypt',
      preparationTime: '25-35',
    }
  });

  const onSubmit = (data: any) => {
    toast.success('Restaurant settings saved successfully');
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your restaurant profile and preferences.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* General Info */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <Store className="text-brand-500" />
            <h2 className="font-bold text-lg text-gray-900">General Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
               <input {...register('name')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
               <textarea {...register('description')} rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
               <input {...register('phone')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Avg. Prep Time (mins)</label>
               <input {...register('preparationTime')} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <Clock className="text-brand-500" />
            <h2 className="font-bold text-lg text-gray-900">Location & Hours</h2>
          </div>

          <div className="space-y-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
               <div className="relative">
                 <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
                 <input {...register('address')} className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
               <span className="text-sm font-medium text-gray-700 md:col-span-1">Mon - Fri</span>
               <input type="time" defaultValue="09:00" className="px-3 py-2 rounded border border-gray-300 text-sm md:col-span-3" />
               <input type="time" defaultValue="22:00" className="px-3 py-2 rounded border border-gray-300 text-sm md:col-span-3" />
               
               <span className="text-sm font-medium text-gray-700 md:col-span-1">Sat - Sun</span>
               <input type="time" defaultValue="10:00" className="px-3 py-2 rounded border border-gray-300 text-sm md:col-span-3" />
               <input type="time" defaultValue="23:00" className="px-3 py-2 rounded border border-gray-300 text-sm md:col-span-3" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PartnerSettingsPage;
