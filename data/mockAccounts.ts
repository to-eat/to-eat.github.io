
import { User } from '@/types';

export const MOCK_ACCOUNTS: Record<string, User> = {
  'user@to-eat.com': {
    id: 'u-1',
    name: 'Ahmed El-Masry',
    email: 'user@to-eat.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    phone: '+20 100 123 4567',
    memberSince: 'Oct 2023',
    addresses: [{ id: 'a-1', label: 'Home', fullAddress: '15 Tahrir St, Downtown, Cairo' }],
    walletBalance: 250.00,
    loyaltyPoints: 1250,
    transactions: [
      { id: 'tx-1', type: 'credit', amount: 500, date: 'Oct 20, 2024', description: 'Top Up' },
      { id: 'tx-2', type: 'debit', amount: 120, date: 'Oct 22, 2024', description: 'Order #ORD-123' }
    ]
  },
  'partner@to-eat.com': {
    id: 'p-1',
    name: 'Hassan El-Brins',
    email: 'partner@to-eat.com',
    role: 'partner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    phone: '+20 100 987 6543',
    memberSince: 'Jan 2023',
    addresses: [],
    restaurantId: 'r-1', // Links to El Sultan
    walletBalance: 15000.00,
    loyaltyPoints: 0,
    transactions: []
  },
  'rider@to-eat.com': {
    id: 'rd-1',
    name: 'Mohamed Salah',
    email: 'rider@to-eat.com',
    role: 'rider',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    phone: '+20 111 222 3333',
    memberSince: 'Mar 2023',
    addresses: [],
    vehicleType: 'Motorcycle (Boxer)',
    walletBalance: 420.50,
    loyaltyPoints: 0,
    transactions: []
  },
  'admin@to-eat.com': {
    id: 'ad-1',
    name: 'System Admin',
    email: 'admin@to-eat.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    phone: '+20 122 333 4444',
    memberSince: 'Jan 2022',
    addresses: [],
    walletBalance: 0,
    loyaltyPoints: 0,
    transactions: []
  }
};
