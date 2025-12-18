
import { StateCreator } from 'zustand';
import { StoreState, RestaurantSlice } from '../types';
import { api } from '@/services/api';

export const createRestaurantSlice: StateCreator<StoreState, [], [], RestaurantSlice> = (set) => ({
  restaurants: [],
  mealKits: [],
  chefs: [],
  reviews: [],

  addRestaurant: async (restaurant) => {
    const newRestaurant = await api.restaurants.create(restaurant);
    set((state) => ({ restaurants: [newRestaurant, ...state.restaurants] }));
  },

  updateRestaurant: async (restaurant) => {
    const updated = await api.restaurants.update(restaurant);
    set((state) => ({
      restaurants: state.restaurants.map((r) => r.id === updated.id ? updated : r)
    }));
  },

  deleteRestaurant: async (id) => {
    await api.restaurants.delete(id);
    set((state) => ({
      restaurants: state.restaurants.filter((r) => r.id !== id)
    }));
  },

  setRestaurantStatus: async (id, status) => {
    const updated = await api.restaurants.updateStatus(id, status);
    set((state) => ({
      restaurants: state.restaurants.map((r) => r.id === id ? updated : r)
    }));
  },

  updateMenu: async (restaurantId, menu) => {
    const updated = await api.restaurants.updateMenu(restaurantId, menu);
    set((state) => ({
      restaurants: state.restaurants.map((r) => r.id === restaurantId ? updated : r)
    }));
  },

  addReview: async (review) => {
    const newReview = await api.reviews.create(review);
    
    // Optimistic or fetched update of restaurant rating could happen here
    // For now, we manually recalculate client-side to keep UI responsive
    set((state) => {
      const newReviews = [newReview, ...state.reviews];
      let updatedRestaurants = state.restaurants;
      
      if (state.restaurants.find(r => r.id === review.targetId)) {
         const restaurantReviews = newReviews.filter(r => r.targetId === review.targetId);
         const totalRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0);
         const avgRating = restaurantReviews.length > 0 ? Number((totalRating / restaurantReviews.length).toFixed(1)) : 0;
         
         updatedRestaurants = state.restaurants.map(r => 
           r.id === review.targetId 
             ? { ...r, rating: avgRating, reviewCount: restaurantReviews.length } 
             : r
         );
      }
      return { reviews: newReviews, restaurants: updatedRestaurants };
    });
  },
});
