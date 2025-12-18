
import { QueryClient } from '@tanstack/react-query';
import { APP_SETTINGS } from '@/config/settings';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: APP_SETTINGS.QUERY.STALE_TIME,
      retry: APP_SETTINGS.QUERY.RETRY_COUNT,
      refetchOnWindowFocus: false,
    },
  },
});
