import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-gray-100 overflow-hidden transition-shadow">
        <div className="grid place-items-center h-full w-12 text-gray-400">
          <Search size={20} />
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent placeholder-gray-500"
          type="text"
          id="search"
          placeholder="Search for dishes, cuisines, restaurants, or chefs..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="pr-1">
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full px-5 py-2 text-sm font-medium transition-colors">
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};