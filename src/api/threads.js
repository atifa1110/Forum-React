import { api, FailedResponse } from './api';

export const threadsAPI = {
  newThreats: async ({ title, category = '', body }) => {
    try {
      return await api.post('threads', {
        title, category, body
      });
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  getThreats: async () => {
    try {
      return await api.get('threads');
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  getThreat: async (id) => {
    try {
      return await api.get(`threads/${id}`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  upVote: async ({ threadId }) => {
    try {
      return await api.post(`threads/${threadId}/up-vote`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  neutralizeVote: async ({ threadId }) => {
    try {
      return await api.post(`threads/${threadId}/neutral-vote`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  downVote: async ({ threadId }) => {
    try {
      return await api.post(`threads/${threadId}/down-vote`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
};