import { tokenFetch } from '@/lib/utils/fetchClient';

export const notificationService = {
  getList: () => tokenFetch('/users/me/notifications'),
  deleteAll: () =>
    tokenFetch('/users/me/notifications', {
      method: 'DELETE',
    }),
  delete: (notiId) =>
    tokenFetch(`/users/me/notifications/${notiId}`, {
      method: 'DELETE',
    }),
};
