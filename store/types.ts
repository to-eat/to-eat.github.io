
import { Restaurant, MealKit, Chef, Review, Order, User, Notification, ChatMessage, RestaurantStatus, OrderStatus, MenuItem } from '@/types';

export interface RestaurantSlice {
  restaurants: Restaurant[];
  mealKits: MealKit[];
  chefs: Chef[];
  reviews: Review[];
  addRestaurant: (restaurant: Restaurant) => Promise<void>;
  updateRestaurant: (restaurant: Restaurant) => Promise<void>;
  deleteRestaurant: (id: string) => Promise<void>;
  setRestaurantStatus: (id: string, status: RestaurantStatus) => Promise<void>;
  updateMenu: (restaurantId: string, menu: MenuItem[]) => Promise<void>;
  addReview: (review: Review) => Promise<void>;
}

export interface OrderSlice {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  fileDispute: (orderId: string, reason: string) => Promise<void>;
  resolveDispute: (orderId: string, resolution: 'Refunded' | 'Resolved') => Promise<void>;
}

export interface UserSlice {
  users: User[];
  toggleUserStatus: (userId: string) => Promise<void>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
}

export interface NotificationSlice {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => Promise<void>;
  markNotificationsAsRead: (userId: string) => Promise<void>;
}

export interface ChatSlice {
  chats: ChatMessage[];
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>;
}

export interface SystemSlice {
  resetStore: () => Promise<void>;
  initializeStore: () => Promise<void>; // New action to hydrate state
}

export type StoreState = RestaurantSlice & OrderSlice & UserSlice & NotificationSlice & ChatSlice & SystemSlice;
