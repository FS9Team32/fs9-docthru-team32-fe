import { defaultFetch } from '@/lib/utils/fetchClient';

export const userService = {
  getMe: () =>
    defaultFetch('/users/me', {
      method: 'GET',
      cache: 'no-store',
    }),
};
