
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Save } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { MenuItem, MenuItemOption } from '@/types';

interface MenuEditorModalProps {
  item?: MenuItem | null; // null means creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

export const MenuEditorModal: React.FC<MenuEditorModalProps> = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Meals',
    image: '',
    popular: false,
    options: []
  });

  const [options, setOptions] = useState<MenuItemOption[]>([]);

  useEffect(() => {
    if (item) {
      setFormData(item);
      setOptions(item.options || []);
    } else {
      // Reset for new item
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Meals',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        popular: false,
        options: []
      });
      setOptions([]);
    }
  }, [item, isOpen]);

  const handleAddOption = () => {
    setOptions([...options, { name: '', price: 0 }]);
  };

  const handleOptionChange = (index: number, field: keyof MenuItemOption, value: string | number) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MenuItem = {
      id: item?.id || `m-${Date.now()}`,
      name: formData.name!,
      description: formData.description!,
      price: Number(formData.price),
      category: formData.category!,
      image: formData.image!,
      popular: formData.popular,
      options: options
    };
    onSave(newItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">{item ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="flex gap-6 flex-col md:flex-row">
            {/* Image Preview */}
            <div className="w-full md:w-1/3 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Item Image</label>
              <div className="aspect-square rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon size={32} />
                    <span className="text-xs mt-2">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button type="button" size="sm" variant="secondary">Change</Button>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Image URL" 
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full text-xs p-2 border border-gray-200 rounded-lg"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                  >
                    <option>Meals</option>
                    <option>Starters</option>
                    <option>Dessert</option>
                    <option>Drinks</option>
                    <option>Seafood</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="popular"
                  checked={formData.popular}
                  onChange={e => setFormData({...formData, popular: e.target.checked})}
                  className="w-4 h-4 text-brand-500 rounded border-gray-300 focus:ring-brand-500"
                />
                <label htmlFor="popular" className="text-sm text-gray-700">Mark as Popular</label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Customization Options</h3>
               <Button type="button" size="sm" variant="secondary" onClick={handleAddOption} className="gap-2">
                 <Plus size={14} /> Add Option
               </Button>
            </div>
            
            {options.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                No options added. (e.g. Extra Cheese, Spicy Level)
              </p>
            ) : (
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <input 
                      type="text" 
                      placeholder="Option Name (e.g. Extra Sauce)"
                      value={opt.name}
                      onChange={e => handleOptionChange(idx, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    />
                    <div className="relative w-24">
                      <span className="absolute left-2 top-2 text-gray-500 text-xs">$</span>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="Price"
                        value={opt.price}
                        onChange={e => handleOptionChange(idx, 'price', Number(e.target.value))}
                        className="w-full pl-5 pr-2 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleSubmit} className="gap-2">
            <Save size={16} /> Save Item
          </Button>
        </div>
      </div>
    </div>
  );
};
