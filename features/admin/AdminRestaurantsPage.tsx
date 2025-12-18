
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Search, Star, Edit, Trash2, AlertTriangle, ShieldCheck, Ban } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Restaurant, RestaurantStatus } from '@/types';
import { RestaurantEditorModal } from './components/RestaurantEditorModal';
import { toast } from 'sonner';
import { useDataStore } from '@/store/useDataStore';

const AdminRestaurantsPage: React.FC = () => {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, setRestaurantStatus } = useDataStore();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<RestaurantStatus | 'All'>('All');
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchesTab = activeTab === 'All' ? true : r.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleAddNew = () => {
    setEditingRestaurant(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this restaurant? This cannot be undone.')) {
      deleteRestaurant(id);
      toast.success('Restaurant removed successfully');
    }
  };

  const handleStatusChange = (id: string, status: RestaurantStatus) => {
    setRestaurantStatus(id, status);
    toast.success(`Restaurant marked as ${status}`);
  };

  const handleSaveRestaurant = (restaurant: Restaurant) => {
    if (editingRestaurant) {
      updateRestaurant(restaurant);
      toast.success('Restaurant updated successfully');
    } else {
      addRestaurant(restaurant);
      toast.success('New restaurant added to Pending list');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Restaurant Management</h1>
        <Button size="sm" onClick={handleAddNew}>Add New Restaurant</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-center gap-4 bg-gray-50">
           <div className="relative flex-1 max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search restaurants..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
            />
          </div>
          
          <div className="flex bg-white rounded-lg p-1 border border-gray-200 w-full md:w-auto">
             {['All', 'Active', 'Pending', 'Suspended'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab ? 'bg-brand-100 text-brand-700' : 'text-gray-500 hover:text-gray-900'
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Restaurant</th>
                <th className="px-6 py-4 font-semibold">Rating</th>
                <th className="px-6 py-4 font-semibold">Orders</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRestaurants.map((rest) => (
                <tr key={rest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg object-cover bg-gray-200 overflow-hidden">
                         <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{rest.name}</p>
                        <p className="text-xs text-gray-500">{rest.cuisine.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      {rest.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {rest.reviewCount * 12}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                      rest.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      rest.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {rest.status === 'Pending' && <AlertTriangle size={12} />}
                      {rest.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       {/* Workflow Actions */}
                       {rest.status === 'Pending' && (
                         <>
                           <button 
                             onClick={() => handleStatusChange(rest.id, 'Active')}
                             className="p-1.5 text-green-500 hover:bg-green-50 rounded transition-colors"
                             title="Approve"
                           >
                             <CheckCircle2 size={18} />
                           </button>
                           <button 
                             onClick={() => handleStatusChange(rest.id, 'Suspended')}
                             className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                             title="Reject"
                           >
                             <XCircle size={18} />
                           </button>
                         </>
                       )}
                       
                       {rest.status === 'Active' && (
                         <button 
                           onClick={() => handleStatusChange(rest.id, 'Suspended')}
                           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                           title="Suspend"
                         >
                           <Ban size={18} />
                         </button>
                       )}

                       {rest.status === 'Suspended' && (
                         <button 
                           onClick={() => handleStatusChange(rest.id, 'Active')}
                           className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded transition-colors"
                           title="Reactivate"
                         >
                           <ShieldCheck size={18} />
                         </button>
                       )}

                       <div className="w-px h-4 bg-gray-300 mx-1 self-center"></div>

                       <button 
                         onClick={() => handleEdit(rest)}
                         className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors"
                         title="Edit"
                       >
                         <Edit size={18} />
                       </button>
                       <button 
                         onClick={() => handleDelete(rest.id)}
                         className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                         title="Delete"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRestaurants.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No restaurants found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RestaurantEditorModal 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        restaurant={editingRestaurant}
        onSave={handleSaveRestaurant}
      />
    </div>
  );
};

export default AdminRestaurantsPage;
