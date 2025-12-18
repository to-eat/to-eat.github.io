
import { StateCreator } from 'zustand';
import { StoreState, OrderSlice } from '../types';
import { api } from '@/services/api';
import { Transaction, Order } from '@/types';

export const createOrderSlice: StateCreator<StoreState, [], [], OrderSlice> = (set, get) => ({
  orders: [],

  updateOrderStatus: async (orderId, status) => {
    const updatedOrder = await api.orders.updateStatus(orderId, status);
    
    // Trigger Notification via API
    if (updatedOrder) {
       await api.notifications.create({
         type: 'order_update',
         title: `Order Updated: ${status}`,
         message: `Your order from ${updatedOrder.items[0]?.restaurantName || 'Restaurant'} is now ${status}.`,
         targetUserId: updatedOrder.userId
       });
    }
    
    // Refresh notifications from server
    const notifs = await api.notifications.getAll();

    set((state) => ({
      orders: state.orders.map((o) => o.id === orderId ? updatedOrder : o),
      notifications: notifs
    }));
  },

  addOrder: async (order) => {
    const newOrder = await api.orders.create(order);
    
    await api.notifications.create({
       type: 'new_order',
       title: 'New Order Received',
       message: `Order #${order.id.split('-')[1]} placed by ${order.customerName}. Value: $${order.total.toFixed(2)}`,
       targetRole: 'partner'
    });

    const pointsAwarded = Math.floor(order.total * 10);
    // Note: In real API, backend calculates points. We mock client update here.
    const currentUser = (get().users.find(u => u.id === order.userId));
    if (currentUser) {
      await api.users.update(order.userId, { 
        loyaltyPoints: (currentUser.loyaltyPoints || 0) + pointsAwarded 
      });
    }

    // Refresh all data involved
    const [orders, notifs, users] = await Promise.all([
      api.orders.getAll(),
      api.notifications.getAll(),
      api.users.getAll()
    ]);

    set({ orders, notifications: notifs, users });
  },

  fileDispute: async (orderId, reason) => {
    const order = get().orders.find(o => o.id === orderId);
    if (!order) return;

    const updated = { ...order, isDisputed: true, disputeReason: reason, disputeStatus: 'Open' as const };
    await api.orders.update(updated);

    await api.notifications.create({
      type: 'dispute_update',
      title: 'New Dispute Filed',
      message: `Dispute on Order #${orderId.split('-')[1]}: ${reason}`,
      targetRole: 'admin'
    });

    const [orders, notifs] = await Promise.all([
      api.orders.getAll(),
      api.notifications.getAll(),
    ]);

    set({ orders, notifications: notifs });
  },

  resolveDispute: async (orderId, resolution) => {
    const order = get().orders.find(o => o.id === orderId);
    if (!order) return;

    const updated = { 
      ...order, 
      disputeStatus: resolution, 
      status: resolution === 'Refunded' ? 'Cancelled' : order.status 
    };
    
    await api.orders.update(updated as Order);

    await api.notifications.create({
      type: 'dispute_update',
      title: 'Dispute Resolved',
      message: `Your dispute for Order #${orderId.split('-')[1]} has been ${resolution}.`,
      targetUserId: order.userId
    });

    if (resolution === 'Refunded') {
       const user = get().users.find(u => u.id === order.userId);
       if (user) {
         const refundTx: Transaction = {
           id: `tx-ref-${Date.now()}`,
           type: 'credit',
           amount: order.total,
           date: new Date().toLocaleDateString(),
           description: `Refund: Order #${order.id.split('-')[1]}`
         };
         await api.users.update(user.id, {
           walletBalance: user.walletBalance + order.total,
           transactions: [refundTx, ...user.transactions]
         });
       }
    }

    // Refresh
    const [ordersData, notifsData, usersData] = await Promise.all([
      api.orders.getAll(),
      api.notifications.getAll(),
      api.users.getAll()
    ]);

    set({ orders: ordersData, notifications: notifsData, users: usersData });
  },
});