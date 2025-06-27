import { api, FailedResponse } from './api';

export const leaderboardAPI = {
  getLeaderboard: async () => {
    try {
      return await api.get('leaderboards');
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
};