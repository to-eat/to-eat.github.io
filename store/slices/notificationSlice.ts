
import { StateCreator } from 'zustand';
import { StoreState, NotificationSlice } from '../types';
import { api } from '@/services/api';

export const createNotificationSlice: StateCreator<StoreState, [], [], NotificationSlice> = (set) => ({
  notifications: [],

  addNotification: async (notification) => {
    const newNotif = await api.notifications.create(notification);
    set((state) => ({
      notifications: [newNotif, ...state.notifications]
    }));
  },

  markNotificationsAsRead: async (userId) => {
    await api.notifications.markAsRead(userId);
    const updated = await api.notifications.getAll();
    set({ notifications: updated });
  },
});
