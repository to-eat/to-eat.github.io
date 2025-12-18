
import { Restaurant, MealKit, Chef, Review, Order, User, Notification, ChatMessage, RestaurantStatus, OrderStatus, MenuItem } from '@/types';

export interface IRestaurantApi {
  getAll: () => Promise<Restaurant[]>;
  getById: (id: string) => Promise<Restaurant | undefined>;
  create: (data: Restaurant) => Promise<Restaurant>;
  update: (data: Restaurant) => Promise<Restaurant>;
  delete: (id: string) => Promise<void>;
  updateStatus: (id: string, status: RestaurantStatus) => Promise<Restaurant>;
  updateMenu: (id: string, menu: MenuItem[]) => Promise<Restaurant>;
}

export interface IOrderApi {
  getAll: () => Promise<Order[]>;
  getById: (id: string) => Promise<Order | undefined>;
  create: (data: Order) => Promise<Order>;
  updateStatus: (id: string, status: OrderStatus) => Promise<Order>;
  update: (order: Order) => Promise<Order>; // Generic update
}

export interface IUserApi {
  getAll: () => Promise<User[]>;
  getById: (id: string) => Promise<User | undefined>;
  update: (id: string, data: Partial<User>) => Promise<User>;
}

export interface IReviewApi {
  getAll: () => Promise<Review[]>;
  create: (data: Review) => Promise<Review>;
}

export interface INotificationApi {
  getAll: () => Promise<Notification[]>;
  create: (data: Omit<Notification, 'id' | 'date' | 'read'>) => Promise<Notification>;
  markAsRead: (userId: string) => Promise<void>;
}

export interface IChatApi {
  getAll: () => Promise<ChatMessage[]>;
  send: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<ChatMessage>;
}

export interface IAuthApi {
  login: (email: string, password?: string) => Promise<User>;
  register: (data: Partial<User> & { password?: string }) => Promise<User>;
}

// Master API Interface
export interface IApiClient {
  auth: IAuthApi;
  restaurants: IRestaurantApi;
  orders: IOrderApi;
  users: IUserApi;
  reviews: IReviewApi;
  notifications: INotificationApi;
  chats: IChatApi;
  
  // Data for read-only catalogs that might not need full CRUD in this demo
  chefs: { getAll: () => Promise<Chef[]> };
  mealKits: { getAll: () => Promise<MealKit[]> };
  
  // System
  reset: () => Promise<void>;
}
