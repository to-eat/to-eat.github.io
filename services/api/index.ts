
import { IApiClient } from './types';
import { mockApi } from './mock';

// In the future, import realApi from './real';

// Toggle this variable or use import.meta.env.VITE_USE_MOCK_API to switch
const USE_MOCK = true;

export const api: IApiClient = USE_MOCK ? mockApi : ({} as IApiClient); // Replace {} with realApi when ready
