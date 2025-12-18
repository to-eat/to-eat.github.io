
import { create } from 'zustand';
import { StoreState } from './types';
import { createRestaurantSlice } from './slices/restaurantSlice';
import { createOrderSlice } from './slices/orderSlice';
import { createUserSlice } from './slices/userSlice';
import { createNotificationSlice } from './slices/notificationSlice';
import { createChatSlice } from './slices/chatSlice';
import { api } from '@/services/api';

export const useDataStore = create<StoreState>((set) => ({
  ...createRestaurantSlice(set, {} as any, {} as any),
  ...createOrderSlice(set, {} as any, {} as any),
  ...createUserSlice(set, {} as any, {} as any),
  ...createNotificationSlice(set, {} as any, {} as any),
  ...createChatSlice(set, {} as any, {} as any),
  
  // System Actions
  resetStore: async () => {
    await api.reset();
    window.location.reload();
  },

  initializeStore: async () => {
    const [restaurants, mealKits, chefs, reviews, orders, users, notifications, chats] = await Promise.all([
      api.restaurants.getAll(),
      api.mealKits.getAll(),
      api.chefs.getAll(),
      api.reviews.getAll(),
      api.orders.getAll(),
      api.users.getAll(),
      api.notifications.getAll(),
      api.chats.getAll()
    ]);

    set({
      restaurants,
      mealKits,
      chefs,
      reviews,
      orders,
      users,
      notifications,
      chats
    });
  }
}));
