import { leaderboardThunks, leaderboardActions } from './action';
import { leaderboardAPI } from '../../api/leaderboard';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

jest.mock('../../api/leaderboard');
jest.mock('react-redux-loading-bar', () => ({
  showLoading: jest.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: jest.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('leaderboardThunks.asyncSetLeaderboard', () => {
  it('should dispatch leaderboardActions.set when API call succeeds', async () => {
    const fakeData = [{ user: { name: 'User' }, score: 100 }];

    leaderboardAPI.getLeaderboard = jest.fn().mockResolvedValue({
      status: 'success',
      leaderboards: fakeData,
    });

    const dispatch = jest.fn();

    await leaderboardThunks.asyncSetLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(leaderboardActions.set(fakeData));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if API call fails', async () => {
    const errorMessage = 'Failed to fetch leaderboard';

    leaderboardAPI.getLeaderboard = jest.fn().mockResolvedValue({
      status: 'fail',
      message: errorMessage,
    });

    const dispatch = jest.fn();

    await expect(
      leaderboardThunks.asyncSetLeaderboard()(dispatch)
    ).rejects.toThrow(errorMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: leaderboardActions.set }));
  });
});
