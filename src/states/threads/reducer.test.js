import { threadsReducer } from './reducer';
import { ThreadsActionType } from './action';

describe('threadsReducer function', () => {
  const initialThreads = [
    {
      id: 'thread-1',
      title: 'Thread 1',
      upVotesBy: [],
      downVotesBy: [],
    },
    {
      id: 'thread-2',
      title: 'Thread 2',
      upVotesBy: [],
      downVotesBy: [],
    },
  ];

  it('should return current state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const result = threadsReducer(initialThreads, action);
    expect(result).toEqual(initialThreads);
  });

  it('should return threads from SET action', () => {
    const newThreads = [{ id: 'thread-3', title: 'Thread 3', upVotesBy: [], downVotesBy: [] }];
    const action = { type: ThreadsActionType.SET, payload: { threads: newThreads } };
    const result = threadsReducer(null, action);
    expect(result).toEqual(newThreads);
  });

  it('should prepend new thread on CREATE action', () => {
    const newThread = { id: 'thread-3', title: 'Thread 3', upVotesBy: [], downVotesBy: [] };
    const action = { type: ThreadsActionType.CREATE, payload: { thread: newThread } };
    const result = threadsReducer(initialThreads, action);
    expect(result[0]).toEqual(newThread);
    expect(result.length).toBe(initialThreads.length + 1);
  });

  it('should add userId to upVotesBy on UP_VOTE action', () => {
    const action = {
      type: ThreadsActionType.UP_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1' }
    };
    const result = threadsReducer(initialThreads, action);
    expect(result[0].upVotesBy).toContain('user-1');
  });

  it('should remove userId from upVotesBy on NEUTRALIZE_UP_VOTE', () => {
    const threads = [
      { ...initialThreads[0], upVotesBy: ['user-1'] },
      initialThreads[1]
    ];
    const action = {
      type: ThreadsActionType.NEUTRALIZE_UP_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1' }
    };
    const result = threadsReducer(threads, action);
    expect(result[0].upVotesBy).not.toContain('user-1');
  });

  it('should add userId to downVotesBy on DOWN_VOTE action', () => {
    const action = {
      type: ThreadsActionType.DOWN_VOTE,
      payload: { threadId: 'thread-2', userId: 'user-2' }
    };
    const result = threadsReducer(initialThreads, action);
    expect(result[1].downVotesBy).toContain('user-2');
  });

  it('should remove userId from downVotesBy on NEUTRALIZE_DOWN_VOTE', () => {
    const threads = [
      initialThreads[0],
      { ...initialThreads[1], downVotesBy: ['user-2'] }
    ];
    const action = {
      type: ThreadsActionType.NEUTRALIZE_DOWN_VOTE,
      payload: { threadId: 'thread-2', userId: 'user-2' }
    };
    const result = threadsReducer(threads, action);
    expect(result[1].downVotesBy).not.toContain('user-2');
  });
});
