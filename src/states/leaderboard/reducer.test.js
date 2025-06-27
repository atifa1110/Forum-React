import { leaderboardReducer } from './reducer';
import { leaderboardActionType } from './action';

describe('leaderboardReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = leaderboardReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return new leaderboard when given SET action', () => {
    const initialState = null;
    const newLeaderboard = [
      { user: { id: 'user-1', name: 'Alice' }, score: 50 },
      { user: { id: 'user-2', name: 'Bob' }, score: 40 },
    ];
    const action = {
      type: leaderboardActionType.SET,
      payload: {
        leaderboard: newLeaderboard,
      },
    };

    const nextState = leaderboardReducer(initialState, action);

    expect(nextState).toEqual(newLeaderboard);
  });
});
