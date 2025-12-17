import { defaultFetch, tokenFetch } from '@/lib/utils/fetchClient';

export const challengeService = {
  getList: () => defaultFetch('/challenges', { cache: 'no-store' }),
  getMyChallenges: () => tokenFetch('/users/me/challenge'),
  getById: (challengeId) => tokenFetch(`/challenges/${challengeId}`),
  update: (challengeId, data) =>
    tokenFetch(`/challenges/${challengeId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (challengeId, adminFeedback) =>
    tokenFetch(`/challenges/${challengeId}`, {
      method: 'DELETE',
      body: JSON.stringify({ adminFeedback }),
    }),
};
