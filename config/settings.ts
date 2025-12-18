
export const APP_SETTINGS = {
  // UI Configuration
  TOAST_DURATION: 800, // 800 milli seconds (Faster dismissal)

  // API Simulation Configuration
  API: {
    SIMULATED_DELAY_MIN: 300,
    SIMULATED_DELAY_MAX: 800,
  },

  // React Query Configuration
  QUERY: {
    STALE_TIME: 1000 * 60 * 1, // 1 minute
    RETRY_COUNT: 1,
  }
};
