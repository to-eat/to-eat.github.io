
import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/queryClient';
import { Router } from '@/router';
import { Toaster } from 'sonner';
import { APP_SETTINGS } from '@/config/settings';
import { useDataStore } from '@/store/useDataStore';

const App: React.FC = () => {
  const initializeStore = useDataStore((state) => state.initializeStore);

  useEffect(() => {
    // Hydrate the global store from API (Mock or Real)
    initializeStore();
  }, [initializeStore]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster 
        position="bottom-left" 
        richColors 
        duration={APP_SETTINGS.TOAST_DURATION} 
      />
    </QueryClientProvider>
  );
};

export default App;
