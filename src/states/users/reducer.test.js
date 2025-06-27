import { usersReducer } from './reducer';
import { UsersActionType } from './action';

/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *   - should return the current state when given an unknown action
 *   - should return new users when given SET action
 */


describe('usersReducer function', () => {
  it('should return the current state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const result = usersReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should return new users when given SET action', () => {
    const initialState = null;
    const newUsers = [
      { id: 'user-1', name: 'Alice' },
      { id: 'user-2', name: 'Bob' },
    ];

    const action = {
      type: UsersActionType.SET,
      payload: {
        users: newUsers,
      },
    };

    const result = usersReducer(initialState, action);

    expect(result).toEqual(newUsers);
  });
});
