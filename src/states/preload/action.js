import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { usersAPI } from '../../api/users';
import { tokenHandler } from '../../utils/accessToken';
import { authAction } from '../auth/action';

export const IsPreloadActionType = {
  SET: 'preload/set',
};

export const isPreloadAction = {
  set(preload) {
    return {
      type: IsPreloadActionType.SET,
      payload: {
        preload,
      },
    };
  }
};

export const isPreloadThunks = {
  asyncPreload() {
    return async (dispatch) => {
      dispatch(showLoading());
      try {
        // preload process
        let value = null;
        if (tokenHandler.has()) {
          const { status, user } = await usersAPI.me();
          if (status !== 'failed') { value = user; }
        }
        // Set auth (bisa null kalau token tidak ada atau gagal)
        dispatch(authAction.set(value));
      } catch (error) {
        // fallback process
        // Tangani error dari API
        console.error('Preload error:', error);
        dispatch(authAction.set(null)); // fallback ke unauthenticated state
      } finally {
        // end preload process
        dispatch(isPreloadAction.set(false));
      }
      dispatch(hideLoading());
    };
  }
};
