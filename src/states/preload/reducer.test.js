import { isPreloadReducer } from './reducer';
import { IsPreloadActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return new preload state when given SET action (false)', () => {
    const initialState = true;
    const action = {
      type: IsPreloadActionType.SET,
      payload: {
        preload: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(false);
  });

  it('should return new preload state when given SET action (true)', () => {
    const initialState = false;
    const action = {
      type: IsPreloadActionType.SET,
      payload: {
        preload: true,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(true);
  });
});
