import { threadReducer } from './reducer';
import { ThreadActionType } from './action';

describe('threadReducer function', () => {
  const baseThread = {
    id: 'thread-1',
    title: 'Test Thread',
    upVotesBy: [],
    downVotesBy: [],
    comments: [],
  };

  it('should return initial state when action is unknown', () => {
    const action = { type: 'UNKNOWN' };
    const result = threadReducer(baseThread, action);
    expect(result).toEqual(baseThread);
  });

  it('should set thread when SET action is dispatched', () => {
    const newThread = { id: 'thread-2', title: 'New Thread' };
    const action = { type: ThreadActionType.SET, payload: { thread: newThread } };
    const result = threadReducer(null, action);
    expect(result).toEqual(newThread);
  });

  it('should add user to upVotesBy when UP_VOTE action is dispatched', () => {
    const action = { type: ThreadActionType.UP_VOTE, payload: { userId: 'user-1' } };
    const result = threadReducer(baseThread, action);
    expect(result.upVotesBy).toContain('user-1');
  });

  it('should remove user from upVotesBy when NEUTRALIZE_UP_VOTE is dispatched', () => {
    const thread = { ...baseThread, upVotesBy: ['user-1'] };
    const action = { type: ThreadActionType.NEUTRALIZE_UP_VOTE, payload: { userId: 'user-1' } };
    const result = threadReducer(thread, action);
    expect(result.upVotesBy).not.toContain('user-1');
  });

  it('should add user to downVotesBy when DOWN_VOTE action is dispatched', () => {
    const action = { type: ThreadActionType.DOWN_VOTE, payload: { userId: 'user-1' } };
    const result = threadReducer(baseThread, action);
    expect(result.downVotesBy).toContain('user-1');
  });

  it('should remove user from downVotesBy when NEUTRALIZE_DOWN_VOTE is dispatched', () => {
    const thread = { ...baseThread, downVotesBy: ['user-1'] };
    const action = { type: ThreadActionType.NEUTRALIZE_DOWN_VOTE, payload: { userId: 'user-1' } };
    const result = threadReducer(thread, action);
    expect(result.downVotesBy).not.toContain('user-1');
  });

  it('should add comment when ADD_COMMENT action is dispatched', () => {
    const comment = { id: 'comment-1', content: 'Nice!', upVotesBy: [], downVotesBy: [] };
    const action = { type: ThreadActionType.ADD_COMMENT, payload: { comment } };
    const result = threadReducer(baseThread, action);
    expect(result.comments[0]).toEqual(comment);
  });

  it('should upvote a comment', () => {
    const comment = { id: 'comment-1', upVotesBy: [], downVotesBy: [] };
    const thread = { ...baseThread, comments: [comment] };
    const action = {
      type: ThreadActionType.UP_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    const result = threadReducer(thread, action);
    expect(result.comments[0].upVotesBy).toContain('user-1');
  });

  it('should neutralize upvote on a comment', () => {
    const comment = { id: 'comment-1', upVotesBy: ['user-1'], downVotesBy: [] };
    const thread = { ...baseThread, comments: [comment] };
    const action = {
      type: ThreadActionType.NEUTRALIZE_UP_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    const result = threadReducer(thread, action);
    expect(result.comments[0].upVotesBy).not.toContain('user-1');
  });

  it('should downvote a comment', () => {
    const comment = { id: 'comment-1', upVotesBy: [], downVotesBy: [] };
    const thread = { ...baseThread, comments: [comment] };
    const action = {
      type: ThreadActionType.DOWN_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    const result = threadReducer(thread, action);
    expect(result.comments[0].downVotesBy).toContain('user-1');
  });

  it('should neutralize downvote on a comment', () => {
    const comment = { id: 'comment-1', upVotesBy: [], downVotesBy: ['user-1'] };
    const thread = { ...baseThread, comments: [comment] };
    const action = {
      type: ThreadActionType.NEUTRALIZE_DOWN_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' }
    };
    const result = threadReducer(thread, action);
    expect(result.comments[0].downVotesBy).not.toContain('user-1');
  });
});
