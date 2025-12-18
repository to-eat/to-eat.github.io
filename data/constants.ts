
import React from 'react';

export const CATEGORIES = [
  { id: 'trending', label: 'Trending', iconName: 'Star', active: true },
  { id: 'oriental', label: 'Oriental Grills', iconName: 'Flame', active: false },
  { id: 'koshari', label: 'Koshari', iconName: 'Utensils', active: false },
  { id: 'street_food', label: 'Street Food', iconName: 'Truck', active: false },
  { id: 'seafood', label: 'Seafood', iconName: 'Fish', active: false },
  { id: 'bakery', label: 'Feteer & Bakery', iconName: 'Croissant', active: false },
  { id: 'dessert', label: 'Oriental Sweets', iconName: 'Cookie', active: false },
  { id: 'home_cooking', label: 'Home Cooking', iconName: 'ChefHat', active: false },
];

export const DIETARY_PREFS = [
  { id: 'vegan', iconName: 'Leaf', label: 'Siyaami (Vegan)', sub: 'Authentic Coptic dishes', bg: 'bg-green-50', iconColor: 'text-green-500' },
  { id: 'halal', iconName: 'Check', label: 'Halal', sub: '100% Certified', bg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { id: 'light', iconName: 'Feather', label: 'Light', sub: 'Less Ghee/Oil', bg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { id: 'family', iconName: 'Users', label: 'Family Size', sub: 'Great for Gatherings', bg: 'bg-orange-50', iconColor: 'text-orange-500' },
];
