import authReducer from './reducer';
import { AuthActionType } from './action';

/**
* test scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the signin authentication user when given by set action
 *   - should return the logout user when given by unset action
 *
 */

describe('authReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const initialState = null;

    const nextState = authReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the signin authentication user when given by SET action', () => {
    const action = {
      type: AuthActionType.SET,
      payload: {
        auth: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };
    const initialState = null;

    const nextState = authReducer(initialState, action);

    expect(nextState).toEqual(action.payload.auth);
  });

  it('should return null when given by UNSET action', () => {
    const action = { type: AuthActionType.UNSET };
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };

    const nextState = authReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
