import { api, FailedResponse } from './api';

export const usersAPI = {
  getUsers: async () => {
    try {
      return await api.get('users');
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  me: async () => {
    try {
      return await api.get('users/me');
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  }
};