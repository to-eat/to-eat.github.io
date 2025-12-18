
export type Role = 'user' | 'partner' | 'rider' | 'admin';

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone: string;
  memberSince: string;
  addresses: Address[];
  walletBalance: number;
  loyaltyPoints: number;
  transactions: Transaction[];
  // Role specific fields
  restaurantId?: string; // For Partners
  vehicleType?: string; // For Riders
  status?: 'Active' | 'Suspended';
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Preparing' | 'Ready' | 'Rider Assigned' | 'Picked Up' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  userId: string; // Link to User
  restaurantId?: string; // Link to Restaurant
  date: string;
  status: OrderStatus;
  total: number;
  items: CartItem[];
  deliveryMethod?: 'delivery' | 'pickup';
  paymentMethod?: 'cash' | 'card' | 'wallet';
  tip?: number;
  deliveryAddress?: string;
  customerName: string;
  // Dispute fields
  isDisputed?: boolean;
  disputeReason?: string;
  disputeStatus?: 'Open' | 'Resolved' | 'Refunded';
}

export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  duration?: number; // seconds
  image?: string;
  tip?: string;
}

export interface MealKit {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  prepTime: number;
  servings: number;
  tags: string[];
  nutrition?: Nutrition;
  ingredients?: string[];
  longDescription?: string;
  chefId?: string; // Linked to Chef
  steps?: RecipeStep[];
}

export interface MenuItemOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  options?: MenuItemOption[];
}

export type RestaurantStatus = 'Active' | 'Pending' | 'Suspended';

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  cuisine: string[];
  distance: number;
  deliveryTime: string;
  priceRange: string;
  image: string;
  isNew?: boolean;
  banner?: string;
  menu?: MenuItem[];
  ownerId?: string; // Link to Partner User
  status?: RestaurantStatus;
}

export interface Chef {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  bio?: string;
  rating?: number;
  followerCount?: string;
  coverImage?: string;
}

export interface DietaryCategory {
  id: string;
  label: string;
  icon: string; // Lucide icon name or emoji
  count: string;
  color: string;
}

export interface TrendingItem {
  id: string;
  name: string;
  restaurant: string;
  orders: string;
  image: string;
}

export interface Review {
  id: string;
  targetId: string; // ID of MealKit or Restaurant
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface FeedResponse {
  mealKits: MealKit[];
  restaurants: Restaurant[];
  chefs: Chef[];
  trending: TrendingItem[];
  user: User;
  orders: Order[];
  reviews: Review[];
}

export interface CartItem {
  cartId: string; // Unique ID for the cart entry (product ID + options)
  id: string; // Original Product ID
  title: string;
  price: number;
  image: string;
  quantity: number;
  restaurantName?: string;
  restaurantId?: string; // Crucial for splitting orders
  selectedOptions?: string[]; // Array of option names
  instructions?: string;
}

export type NotificationType = 'order_update' | 'promo' | 'system' | 'dispute_update' | 'new_order';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  targetUserId?: string; // Specific user
  targetRole?: Role; // Broadcast to role (e.g. all admins)
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  role: 'user' | 'rider';
  text: string;
  timestamp: string;
}
