
import { db } from '@/data/db';
import { MOCK_ACCOUNTS } from '@/data/mockAccounts';
import { RestaurantStatus } from '@/types';

// Convert MOCK_ACCOUNTS record to array for initial state
export const getInitialUsers = () => {
  const users = Object.values(MOCK_ACCOUNTS).map(u => ({
    ...u,
    status: 'Active' as const
  }));
  // Ensure the main mock user is in the list
  if (!users.find(u => u.id === db.user.id)) {
    users.push({ ...db.user, status: 'Active', loyaltyPoints: 450 } as any);
  }
  return users;
};

// Initialize restaurants with status
export const getInitialRestaurants = () => db.restaurants.map(r => ({
  ...r,
  status: 'Active' as RestaurantStatus
}));

export const initialState = {
  restaurants: getInitialRestaurants(),
  mealKits: db.mealKits,
  orders: db.orders, 
  chefs: db.chefs,
  reviews: db.reviews,
  users: getInitialUsers(),
  chats: [],
  notifications: [
    {
       id: 'notif-1',
       type: 'system' as const,
       title: 'Welcome to To-Eat',
       message: 'Thanks for joining our platform!',
       date: 'Just now',
       read: false,
       targetRole: 'user' as const
    }
  ],
};
