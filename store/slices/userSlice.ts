
import { StateCreator } from 'zustand';
import { StoreState, UserSlice } from '../types';
import { api } from '@/services/api';

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (set, get) => ({
  users: [],

  toggleUserStatus: async (userId) => {
    const user = get().users.find(u => u.id === userId);
    if (!user) return;
    
    const newStatus = (user as any).status === 'Active' ? 'Suspended' : 'Active';
    const updated = await api.users.update(userId, { status: newStatus } as any);
    
    set((state) => ({
      users: state.users.map(u => u.id === userId ? updated : u)
    }));
  },

  updateUser: async (userId, updates) => {
    const updated = await api.users.update(userId, updates);
    set((state) => ({
      users: state.users.map(u => u.id === userId ? updated : u)
    }));
  },
});
