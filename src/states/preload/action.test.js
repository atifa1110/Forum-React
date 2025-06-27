import { isPreloadThunks, isPreloadAction } from './action';
import { authAction } from '../auth/action';
import { tokenHandler } from '../../utils/accessToken';
import { usersAPI } from '../../api/users';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

jest.mock('../../api/users');
jest.mock('../../utils/accessToken');
jest.mock('react-redux-loading-bar', () => ({
  showLoading: jest.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: jest.fn(() => ({ type: 'HIDE_LOADING' })),
}));
jest.mock('../auth/action', () => ({
  authAction: {
    set: jest.fn((payload) => ({ type: 'AUTH/SET', payload }))
  }
}));

describe('isPreloadThunks.asyncPreload', () => {
  it('should dispatch set auth with user if token exists and API succeeds', async () => {
    const fakeUser = { id: 'user-1', name: 'Adiva' };
    tokenHandler.has = jest.fn(() => true);
    usersAPI.me = jest.fn().mockResolvedValue({
      status: 'success',
      user: fakeUser
    });

    const dispatch = jest.fn();

    await isPreloadThunks.asyncPreload()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(authAction.set(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(isPreloadAction.set(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch set auth with null if token does not exist', async () => {
    tokenHandler.has = jest.fn(() => false);

    const dispatch = jest.fn();

    await isPreloadThunks.asyncPreload()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(authAction.set(null));
    expect(dispatch).toHaveBeenCalledWith(isPreloadAction.set(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch set auth with null if API fails', async () => {
    tokenHandler.has = jest.fn(() => true);
    usersAPI.me = jest.fn().mockRejectedValue(new Error('API failed'));

    const dispatch = jest.fn();

    await isPreloadThunks.asyncPreload()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(authAction.set(null)); // fallback
    expect(dispatch).toHaveBeenCalledWith(isPreloadAction.set(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
