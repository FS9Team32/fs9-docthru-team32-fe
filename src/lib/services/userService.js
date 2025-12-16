import { tokenFetch } from '@/lib/utils/fetchClient';

export const userService = {
  getUser: async () => {
    try {
      const userData = await tokenFetch('/users/me', { method: 'GET' });
      return userData;
    } catch (error) {
      console.error('Failed to load user data:', error);
      throw error; // 에러를 다시 던져서 컴포넌트에서 처리
    }
  },
};
