
import { StateCreator } from 'zustand';
import { StoreState, ChatSlice } from '../types';
import { api } from '@/services/api';

export const createChatSlice: StateCreator<StoreState, [], [], ChatSlice> = (set) => ({
  chats: [],

  sendMessage: async (message) => {
    const newMsg = await api.chats.send(message);
    set((state) => ({
      chats: [...state.chats, newMsg]
    }));
  },
});
