import { api, FailedResponse } from './api';

export const commentsAPI = {
  add: async ({ threadId, comment }) => {
    try {
      return await api.post(`threads/${threadId}/comments`, {
        content: comment
      });
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  upVote: async ({ threadId, commentId }) => {
    try {
      return await api.post(`threads/${threadId}/comments/${commentId}/up-vote`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  neutralizeVote: async ({ threadId, commentId }) => {
    try {
      return await api.post(`threads/${threadId}/comments/${commentId}/neutral-vote`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
  downVote: async ({ threadId, commentId }) => {
    try {
      return await api.post(`threads/${threadId}/comments/${commentId}/down-vote`);
    } catch (error) {
      return FailedResponse({
        message: error,
      });
    }
  },
};