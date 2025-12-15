import { defaultFetch } from '@/lib/utils/fetchClient';

export const challengeService = {
  getList: () => defaultFetch('/challenges'),
};
