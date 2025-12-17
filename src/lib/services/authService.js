import { defaultFetch, tokenFetch } from '@/lib/utils/fetchClient';

export const authService = {
  login: ({ email, password }) =>
    defaultFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
      credentials: 'include',
    }),
  signup: ({ nickname, email, password }) =>
    defaultFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ nickname, email, password }),
      cache: 'no-store',
    }),

  refresh: () =>
    defaultFetch('/auth/token/refresh', {
      method: 'POST',
      cache: 'no-store',
    }),
  logout: () =>
    tokenFetch('/auth/logout', {
      method: 'POST',
    }),
};
