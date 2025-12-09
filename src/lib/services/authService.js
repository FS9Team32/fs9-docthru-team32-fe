import { defaultFetch } from '@/lib/utils/fetchClient';
export const authService = {
  login: ({ email, password }) =>
    defaultFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  signup: ({ nickname, email, password }) =>
    defaultFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ nickname, email, password }),
    }),

  refresh: () =>
    defaultFetch('/auth/refresh-token', {
      method: 'POST',
    }),
};
