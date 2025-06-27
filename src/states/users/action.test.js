import { usersThunks } from './action'; // ganti sesuai path kamu
import { usersAPI } from '../../api/users';
import { usersActions } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

/**
 * test scenario for usersAction
 *
 * - usersAction function
 *  - should dispatch set and hideLoading when success
 *  - should not dispatch set but still dispatch hideLoading when failed
 */

jest.mock('../../api/users');

describe('usersThunks.asyncGetUsers', () => {
  it('should dispatch set and hideLoading when success', async () => {
    // Arrange
    const fakeUsers = [{ id: 'user-1', name: 'Test User' }];
    usersAPI.getUsers.mockResolvedValue({ status: 'success', users: fakeUsers });

    const dispatch = jest.fn();

    // Act
    await usersThunks.asyncGetUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(usersActions.set(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should not dispatch set but still dispatch hideLoading when failed', async () => {
    // Arrange
    usersAPI.getUsers.mockResolvedValue({ status: 'failed', users: [] });

    const dispatch = jest.fn();

    // Act
    await usersThunks.asyncGetUsers()(dispatch);

    const expectedSetAction = usersActions.set([]);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).not.toHaveBeenCalledWith(expectedSetAction);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
