import { tokenFetch } from '@/lib/utils/fetchClient';

export const challengeService = {
  create: (data) =>
    tokenFetch('/challenge-applications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
