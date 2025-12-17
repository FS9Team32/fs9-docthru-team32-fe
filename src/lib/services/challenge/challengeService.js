import { defaultFetch, tokenFetch } from '@/lib/utils/fetchClient';

export const challengeService = {
  getList: () => defaultFetch('/challenges'),
  getMyChallenges: () => tokenFetch('/users/me/challenge'),
  getById: (challengeId) => tokenFetch(`/challenges/${challengeId}`),
  delete: (challengeId, adminFeedback) =>
    tokenFetch(`/challenges/${challengeId}`, {
      method: 'DELETE',
      body: JSON.stringify({ adminFeedback }),
    }),
};
