import { api, FailedResponse } from './api';

export const authAPI = {
  login: async ({ email, password }) => {
    try {
      return await api.post('login', {
        email, password
      });
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  register: async ({ name, email, password }) => {
    try {
      return await api.post('register', {
        name, email, password
      });
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
};