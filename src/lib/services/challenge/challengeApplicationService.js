import { tokenFetch } from '@/lib/utils/fetchClient';

export const challengeApplicationService = {
  create: (data) =>
    tokenFetch('/challenge-applications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  get: () => tokenFetch('/users/me/challenge-applications'),
  getAll: () => tokenFetch('/challenge-applications'),
  getById: (applicationId) =>
    tokenFetch(`/challenge-applications/${applicationId}`),
};
