import { useQuery } from '@tanstack/react-query';
import { fetchFeed } from './api';

export const useFeed = () => {
  return useQuery({
    queryKey: ['feed'],
    queryFn: fetchFeed,
  });
};