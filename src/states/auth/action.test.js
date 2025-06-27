import { authThunks, authAction } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { authAPI } from '../../api/auth';
import { usersAPI } from '../../api/users';
import { tokenHandler } from '../../utils/accessToken';

/**
* test scenario for authUserAction
 *
 * - authUserAction function
 *   - should dispatch set auth when login success
 *   - should throw error and not set auth when login fails
 *   - should hide loading when register succeeds
 *   - should throw error when register fails
 *   - should unset token and dispatch unset auth
 *
 */
jest.mock('../../api/auth');
jest.mock('../../api/users');
jest.mock('../../utils/accessToken');

describe('authThunks.asyncLogin', () => {
  it('should dispatch set auth when login success', async () => {
    // Arrange
    const fakeToken = 'fake-token';
    const fakeUser = { id: 'user-1', name: 'Test User' };

    authAPI.login.mockResolvedValue({ status: 'success', message: '', token: fakeToken });
    usersAPI.me.mockResolvedValue({ user: fakeUser });
    const dispatch = jest.fn();
    // Act
    await authThunks.asyncLogin({ email: 'a@mail.com', password: '123456' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(tokenHandler.set).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(authAction.set(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not set auth when login fails', async () => {
    // Arrange
    const fakeMessage = 'Invalid credentials';
    authAPI.login.mockResolvedValue({ status: 'failed', message: fakeMessage, token: null });

    //tokenHandler.set = jest.fn();
    const dispatch = jest.fn();

    // Act & Assert
    await expect(authThunks.asyncLogin({ email: 'fail@mail.com', password: 'wrong' })(dispatch))
      .rejects.toThrow(fakeMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(tokenHandler.set).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(authAction.set(expect.anything()));
  });
});

describe('authThunks.asyncRegister', () => {
  it('should hide loading when register succeeds', async () => {
    authAPI.register.mockResolvedValue({ status: 'success', message: '' });
    const dispatch = jest.fn();

    await authThunks.asyncRegister({ name: 'test', email: 'a@mail.com', password: '123456' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error when register fails', async () => {
    const errorMsg = 'Email already used';
    authAPI.register.mockResolvedValue({ status: 'failed', message: errorMsg });
    const dispatch = jest.fn();

    await expect(authThunks.asyncRegister({ name: 'test', email: 'fail@mail.com', password: '123456' })(dispatch))
      .rejects.toThrow(errorMsg);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('authThunks.asyncLogout', () => {
  it('should unset token and dispatch unset auth', () => {
    const dispatch = jest.fn();

    authThunks.asyncLogout()(dispatch);

    expect(tokenHandler.unset).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(authAction.unset());
  });
});
