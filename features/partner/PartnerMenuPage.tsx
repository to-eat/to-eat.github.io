
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { MenuItem } from '@/types';
import { MenuEditorModal } from './components/MenuEditorModal';
import { toast } from 'sonner';
import { useDataStore } from '@/store/useDataStore';
import { EmptyState } from '@/components/molecules/EmptyState';

const PartnerMenuPage: React.FC = () => {
  const { restaurants, updateMenu } = useDataStore();
  // Simulate managing menu for the first restaurant
  const currentRestaurant = restaurants[0];
  const [search, setSearch] = useState('');
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const menu = currentRestaurant.menu || [];

  const filteredMenu = menu.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingItem(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const newMenu = menu.filter(item => item.id !== id);
      updateMenu(currentRestaurant.id, newMenu);
      toast.success('Item deleted successfully');
    }
  };

  const handleSaveItem = (item: MenuItem) => {
    if (editingItem) {
      // Update existing
      const newMenu = menu.map(i => i.id === item.id ? item : i);
      updateMenu(currentRestaurant.id, newMenu);
      toast.success('Item updated successfully');
    } else {
      // Create new
      const newMenu = [item, ...menu];
      updateMenu(currentRestaurant.id, newMenu);
      toast.success('New item added to menu');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
           <p className="text-gray-500 text-sm">Manage your items, prices, and availability.</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleAddNew}>
          <Plus size={18} />
          Add New Item
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4 bg-gray-50">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-gray-300 text-sm bg-white outline-none">
            <option>All Categories</option>
            <option>Meals</option>
            <option>Drinks</option>
          </select>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-6 md:col-span-5">Item</div>
          <div className="col-span-3 md:col-span-2">Category</div>
          <div className="col-span-3 md:col-span-2">Price</div>
          <div className="col-span-3 hidden md:block text-center">Status</div>
          <div className="col-span-12 md:col-span-1 text-right">Actions</div>
        </div>

        {/* Items */}
        <div className="divide-y divide-gray-100">
          {filteredMenu.length === 0 ? (
             <div className="p-8">
               <EmptyState 
                 icon={UtensilsCrossed} 
                 title="No Items Found" 
                 description={search ? "No menu items match your search." : "Start by adding items to your menu."}
                 actionLabel={search ? undefined : "Add First Item"}
                 onAction={search ? undefined : handleAddNew}
                 className="border-none py-12"
               />
             </div>
          ) : (
            filteredMenu.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1 hidden sm:block">{item.description}</p>
                  </div>
                </div>
                
                <div className="col-span-3 md:col-span-2">
                  <span className="inline-block px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
                    {item.category}
                  </span>
                </div>
                
                <div className="col-span-3 md:col-span-2 text-sm font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>

                <div className="col-span-3 hidden md:flex justify-center">
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                      <span className="ml-2 text-xs font-medium text-gray-600">In Stock</span>
                    </label>
                </div>

                <div className="col-span-12 md:col-span-1 flex justify-end gap-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <MenuEditorModal 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
      />
    </div>
  );
};

export default PartnerMenuPage;
