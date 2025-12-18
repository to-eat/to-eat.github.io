
import { IApiClient } from './types';
import { db } from '@/data/db';
import { MOCK_ACCOUNTS } from '@/data/mockAccounts';
import { FeedResponse, Restaurant, Order, User, Review, Notification, ChatMessage, MealKit, Chef } from '@/types';

const STORAGE_KEY = 'to-eat-mock-db-v2';
const SIMULATED_DELAY = 400;

// Initial Data Setup
const getInitialData = (): FeedResponse => {
  const users = Object.values(MOCK_ACCOUNTS).map(u => ({ ...u, status: 'Active' as const }));
  if (!users.find(u => u.id === db.user.id)) {
    users.push({ ...db.user, status: 'Active' as any });
  }

  return {
    restaurants: db.restaurants.map(r => ({ ...r, status: 'Active' as const })),
    mealKits: db.mealKits,
    chefs: db.chefs,
    reviews: db.reviews,
    orders: db.orders,
    user: db.user, // Not used in DB, just for type compliance
    trending: db.trending, // Not used
  };
};

// Helper to read/write DB
class MockDatabase {
  private data: any;

  constructor() {
    this.load();
  }

  private load() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.data = JSON.parse(stored);
    } else {
      this.data = { ...getInitialData(), chats: [], notifications: [] };
      this.save();
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  async read<T>(collection: string): Promise<T[]> {
    await new Promise(r => setTimeout(r, SIMULATED_DELAY));
    return this.data[collection] || [];
  }

  async write<T>(collection: string, items: T[]) {
    await new Promise(r => setTimeout(r, SIMULATED_DELAY));
    this.data[collection] = items;
    this.save();
  }
  
  async reset() {
    this.data = { ...getInitialData(), chats: [], notifications: [] };
    this.save();
  }
}

const dbInstance = new MockDatabase();

export const mockApi: IApiClient = {
  auth: {
    login: async (email, password) => {
      const users = await dbInstance.read<User>('users');
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      if (user.status === 'Suspended') {
        throw new Error('Account suspended. Please contact support.');
      }

      // In a real app, we would verify password here. 
      // For demo, we assume password is correct if user exists.
      return user;
    },
    register: async (data) => {
      const users = await dbInstance.read<User>('users');
      
      if (users.find(u => u.email.toLowerCase() === data.email?.toLowerCase())) {
        throw new Error('Email already exists');
      }

      const newUser: User = {
        id: `u-${Date.now()}`,
        name: data.name || 'New User',
        email: data.email!,
        role: data.role || 'user',
        avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`, // Random avatar
        phone: data.phone || '',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        addresses: [],
        walletBalance: 0,
        loyaltyPoints: 0,
        transactions: [],
        status: 'Active',
        ...data // Override defaults
      };

      await dbInstance.write('users', [...users, newUser]);
      return newUser;
    }
  },

  restaurants: {
    getAll: () => dbInstance.read<Restaurant>('restaurants'),
    getById: async (id) => (await dbInstance.read<Restaurant>('restaurants')).find(r => r.id === id),
    create: async (data) => {
      const list = await dbInstance.read<Restaurant>('restaurants');
      const newItem = { ...data, id: `r-${Date.now()}`, status: 'Pending' as const };
      await dbInstance.write('restaurants', [newItem, ...list]);
      return newItem;
    },
    update: async (data) => {
      const list = await dbInstance.read<Restaurant>('restaurants');
      const updated = list.map(r => r.id === data.id ? data : r);
      await dbInstance.write('restaurants', updated);
      return data;
    },
    delete: async (id) => {
      const list = await dbInstance.read<Restaurant>('restaurants');
      await dbInstance.write('restaurants', list.filter(r => r.id !== id));
    },
    updateStatus: async (id, status) => {
      const list = await dbInstance.read<Restaurant>('restaurants');
      const item = list.find(r => r.id === id);
      if (item) {
        item.status = status;
        await dbInstance.write('restaurants', list);
        return item;
      }
      throw new Error('Restaurant not found');
    },
    updateMenu: async (id, menu) => {
      const list = await dbInstance.read<Restaurant>('restaurants');
      const item = list.find(r => r.id === id);
      if (item) {
        item.menu = menu;
        await dbInstance.write('restaurants', list);
        return item;
      }
      throw new Error('Restaurant not found');
    }
  },

  orders: {
    getAll: () => dbInstance.read<Order>('orders'),
    getById: async (id) => (await dbInstance.read<Order>('orders')).find(o => o.id === id),
    create: async (data) => {
      const list = await dbInstance.read<Order>('orders');
      await dbInstance.write('orders', [data, ...list]);
      return data;
    },
    updateStatus: async (id, status) => {
      const list = await dbInstance.read<Order>('orders');
      const item = list.find(o => o.id === id);
      if (item) {
        item.status = status;
        await dbInstance.write('orders', list);
        return item;
      }
      throw new Error('Order not found');
    },
    update: async (order) => {
      const list = await dbInstance.read<Order>('orders');
      const updated = list.map(o => o.id === order.id ? order : o);
      await dbInstance.write('orders', updated);
      return order;
    }
  },

  users: {
    getAll: () => dbInstance.read<User>('users'),
    getById: async (id) => (await dbInstance.read<User>('users')).find(u => u.id === id),
    update: async (id, data) => {
      const list = await dbInstance.read<User>('users');
      const item = list.find(u => u.id === id);
      if (item) {
        const updatedUser = { ...item, ...data };
        await dbInstance.write('users', list.map(u => u.id === id ? updatedUser : u));
        return updatedUser;
      }
      throw new Error('User not found');
    }
  },

  reviews: {
    getAll: () => dbInstance.read<Review>('reviews'),
    create: async (data) => {
      const list = await dbInstance.read<Review>('reviews');
      await dbInstance.write('reviews', [data, ...list]);
      return data;
    }
  },

  notifications: {
    getAll: () => dbInstance.read<Notification>('notifications'),
    create: async (data) => {
      const list = await dbInstance.read<Notification>('notifications');
      const newItem = { ...data, id: `n-${Date.now()}`, date: 'Just now', read: false };
      await dbInstance.write('notifications', [newItem, ...list]);
      return newItem;
    },
    markAsRead: async (userId) => {
      const list = await dbInstance.read<Notification>('notifications');
      const updated = list.map(n => (n.targetUserId === userId || !n.targetUserId) ? { ...n, read: true } : n);
      await dbInstance.write('notifications', updated);
    }
  },

  chats: {
    getAll: () => dbInstance.read<ChatMessage>('chats'),
    send: async (data) => {
      const list = await dbInstance.read<ChatMessage>('chats');
      const newItem = { 
        ...data, 
        id: `msg-${Date.now()}`, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      await dbInstance.write('chats', [...list, newItem]);
      return newItem;
    }
  },

  chefs: {
    getAll: () => dbInstance.read<Chef>('chefs')
  },

  mealKits: {
    getAll: () => dbInstance.read<MealKit>('mealKits')
  },

  reset: async () => {
    await dbInstance.reset();
  }
};
