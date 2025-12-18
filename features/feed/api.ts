
import { FeedResponse } from '@/types';
import { db } from '@/data/db'; // Fallback
import { APP_SETTINGS } from '@/config/settings';
import { useDataStore } from '@/store/useDataStore';

/**
 * Fetches the main feed data.
 * Now simply grabs state from the hydrated store to keep it in sync with user edits.
 */
export const fetchFeed = async (): Promise<FeedResponse> => {
  // Simulate network delay for effect
  await new Promise(resolve => setTimeout(resolve, APP_SETTINGS.API.SIMULATED_DELAY_MIN));
  
  // Get latest data from the global store (which is now populated by the API service)
  const state = useDataStore.getState();

  // If store is empty (first load race condition), return default db
  if (state.restaurants.length === 0) {
    return db;
  }

  return {
    ...db,
    restaurants: state.restaurants,
    mealKits: state.mealKits,
    orders: state.orders,
    chefs: state.chefs,
    reviews: state.reviews,
  };
};
