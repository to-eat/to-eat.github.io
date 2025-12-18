
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, User, Address, Role, Transaction } from '@/types';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface AppState {
  // Cart Slice
  cart: CartItem[];
  favorites: string[];
  addToCart: (item: Partial<CartItem> & { id: string, title: string, price: number, image: string }) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Auth Slice
  user: User | null;
  login: (email: string, password?: string) => Promise<User | null>;
  register: (data: Partial<User> & { password?: string }) => Promise<User | null>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  
  // Wallet & Loyalty Actions
  deductWallet: (amount: number, description: string) => boolean;
  topUpWallet: (amount: number) => void;
  accruePoints: (amount: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // --- Cart Logic ---
      cart: [],
      favorites: [],
      
      addToCart: (item) => {
        set((state) => {
          const optionsKey = item.selectedOptions ? item.selectedOptions.sort().join(',') : '';
          const existing = state.cart.find((i) => i.id === item.id && (
            (i.selectedOptions ? i.selectedOptions.sort().join(',') : '') === optionsKey
          ));

          if (existing) {
            toast.success(`Updated quantity for ${item.title}`);
            return {
              cart: state.cart.map((i) =>
                i.cartId === existing.cartId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
              ),
            };
          }
          
          toast.success(`Added ${item.title} to cart`);
          const newCartId = `${item.id}-${Date.now()}`;
          
          return {
            cart: [...state.cart, { 
              cartId: newCartId,
              id: item.id, 
              title: item.title, 
              price: item.price, 
              image: item.image, 
              quantity: item.quantity || 1,
              restaurantName: item.restaurantName || 'To-Eat Meal Kits',
              restaurantId: item.restaurantId, // Important for splitting orders
              selectedOptions: item.selectedOptions || [],
              instructions: item.instructions || ''
            }],
          };
        });
      },

      removeFromCart: (cartId) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.cartId !== cartId),
        }));
      },

      updateQuantity: (cartId, delta) => {
        set((state) => {
          const newCart = state.cart.map((item) => {
            if (item.cartId === cartId) {
              return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
          });
          return { cart: newCart };
        });
      },

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (id) => {
        set((state) => {
          const isFav = state.favorites.includes(id);
          const newFavorites = isFav 
            ? state.favorites.filter(favId => favId !== id)
            : [...state.favorites, id];
          
          if (!isFav) toast.success('Added to favorites');
          return { favorites: newFavorites };
        });
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // --- Auth Logic ---
      user: null, 
      
      login: async (email, password) => {
        try {
          const user = await api.auth.login(email, password);
          set({ user });
          toast.success(`Welcome back, ${user.name}!`);
          return user;
        } catch (error: any) {
          toast.error(error.message || "Login failed");
          return null;
        }
      },

      register: async (data) => {
        try {
          const user = await api.auth.register(data);
          set({ user });
          toast.success(`Account created! Welcome, ${user.name}.`);
          return user;
        } catch (error: any) {
          toast.error(error.message || "Registration failed");
          return null;
        }
      },

      logout: () => {
        set({ user: null, cart: [] }); 
        toast.info('You have been logged out');
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return {};
          const newAddress = { ...address, id: `a-${Date.now()}` };
          const updatedUser = { 
            ...state.user, 
            addresses: [...state.user.addresses, newAddress] 
          };
          toast.success('Address added successfully');
          return { user: updatedUser };
        });
      },

      updateCurrentUser: (updates) => {
        set((state) => {
          if (!state.user) return {};
          return { user: { ...state.user, ...updates } };
        });
      },

      deductWallet: (amount, description) => {
        const { user } = get();
        if (!user) return false;
        
        if (user.walletBalance < amount) {
          toast.error('Insufficient wallet funds');
          return false;
        }

        const newTransaction: Transaction = {
          id: `tx-${Date.now()}`,
          type: 'debit',
          amount: amount,
          date: new Date().toLocaleDateString(),
          description: description
        };

        const updatedUser = {
          ...user,
          walletBalance: user.walletBalance - amount,
          transactions: [newTransaction, ...user.transactions]
        };

        set({ user: updatedUser });
        return true;
      },

      topUpWallet: (amount) => {
        set((state) => {
          if (!state.user) return {};
          const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            type: 'credit',
            amount: amount,
            date: new Date().toLocaleDateString(),
            description: 'Wallet Top Up'
          };
          return {
            user: {
              ...state.user,
              walletBalance: state.user.walletBalance + amount,
              transactions: [newTransaction, ...state.user.transactions]
            }
          };
        });
        toast.success(`Added $${amount} to wallet`);
      },

      accruePoints: (amount) => {
        set((state) => {
          if (!state.user) return {};
          return {
            user: {
              ...state.user,
              loyaltyPoints: (state.user.loyaltyPoints || 0) + amount
            }
          };
        });
      }
    }),
    {
      name: 'to-eat-storage',
      partialize: (state) => ({ 
        cart: state.cart, 
        favorites: state.favorites,
        user: state.user 
      }),
    }
  )
);
