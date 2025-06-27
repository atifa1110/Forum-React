import { threadThunks, threadAction } from './action';
import { threadsAPI } from '../../api/threads';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { commentsAPI } from '../../api/comments';

jest.mock('../../api/threads'); // important!
jest.mock('../../api/comments'); // important!
jest.mock('react-redux-loading-bar', () => ({
  showLoading: jest.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: jest.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('threadThunks.asyncGetThread', () => {
  it('should dispatch get thead correct actions when API call succeeds', async () => {
    const fakeThread = { id: 'thread-1', title: 'Test Thread' };
    threadsAPI.getThreat.mockResolvedValue({
      status: 'success',
      detailThread: fakeThread
    });

    const dispatch = jest.fn();
    await threadThunks.asyncGetThread('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.set(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and only show/hide loading when API fails', async () => {
    const fakeMessage = 'Thread not found';
    threadsAPI.getThreat.mockResolvedValue({
      status: 'fail',
      message: fakeMessage
    });

    const dispatch = jest.fn();

    await expect(threadThunks.asyncGetThread('invalid-thread')(dispatch))
      .rejects.toThrow(fakeMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.set(expect.anything()));
  });
});

describe('threadThunks.asyncUpVoteThread', () => {
  it('should dispatch correct actions when upvote succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    threadsAPI.upVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncUpVoteThread({ threadId: fakeThreadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.upVoteThread(fakeUserId, fakeThreadId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if failed', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: 'user-1' } });
    const fakeError = 'Upvote failed';

    threadsAPI.upVote.mockResolvedValue({
      status: 'failed',
      message: fakeError
    });

    await expect(
      threadThunks.asyncUpVoteThread({ threadId: 'thread-1' })(dispatch, getState)
    ).rejects.toThrow(fakeError);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.upVoteThread(expect.anything(), expect.anything()));
  });
});

describe('threadThunks.asyncNeutralizeUpVoteThread', () => {
  it('should dispatch correct actions when neutralize upvote succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    threadsAPI.neutralizeVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncNeutralizeUpVoteThread({ threadId: fakeThreadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.neutralizeUpVoteThread(fakeUserId, fakeThreadId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if neutralize vote failed', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: 'user-1' } });
    const fakeError = 'Upvote failed';

    threadsAPI.neutralizeVote.mockResolvedValue({
      status: 'failed',
      message: fakeError
    });

    await expect(
      threadThunks.asyncNeutralizeUpVoteThread({ threadId: 'thread-1' })(dispatch, getState)
    ).rejects.toThrow(fakeError);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.neutralizeUpVoteThread(expect.anything(), expect.anything()));
  });
});

describe('threadThunks.asyncDownVoteThread', () => {
  it('should dispatch correct actions when downvote succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    threadsAPI.downVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncDownVoteThread({ threadId: fakeThreadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.downVoteThread(fakeUserId, fakeThreadId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if downvote failed', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: 'user-1' } });
    const fakeError = 'Upvote failed';

    threadsAPI.downVote.mockResolvedValue({
      status: 'failed',
      message: fakeError
    });

    await expect(
      threadThunks.asyncDownVoteThread({ threadId: 'thread-1' })(dispatch, getState)
    ).rejects.toThrow(fakeError);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.downVoteThread(expect.anything(), expect.anything()));
  });
});

describe('threadThunks.asyncNeutralizeDownVoteThread', () => {
  it('should dispatch correct actions when neutralize downvote succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    threadsAPI.neutralizeVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncNeutralizeDownVoteThread({ threadId: fakeThreadId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.neutralizeDownVoteThread(fakeUserId, fakeThreadId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if neutralize down vote failed', async () => {
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: 'user-1' } });
    const fakeError = 'Upvote failed';

    threadsAPI.neutralizeVote.mockResolvedValue({
      status: 'failed',
      message: fakeError
    });

    await expect(
      threadThunks.asyncNeutralizeDownVoteThread({ threadId: 'thread-1' })(dispatch, getState)
    ).rejects.toThrow(fakeError);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.neutralizeDownVoteThread(expect.anything(), expect.anything()));
  });
});

describe('threadThunks.asyncAddComment', () => {
  it('should dispatch correct actions when add comment succeeds', async () => {
    const threadId = 'thread-1';
    const commentContent = 'This is a comment';
    const fakeComment = { id: 'comment-1', content: commentContent };

    commentsAPI.add.mockResolvedValue({ status: 'success', comment : fakeComment });
    const dispatch = jest.fn();
    await threadThunks.asyncAddComment({ threadId, comment: commentContent })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.addComment(fakeComment));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch when add comment failed', async () => {
    const threadId = 'thread-1';
    const commentContent = 'Error comment';
    const errorMessage = 'Failed to add comment';

    commentsAPI.add.mockResolvedValue({
      status: 'failed',
      message: errorMessage
    });

    const dispatch = jest.fn();

    await expect(
      threadThunks.asyncAddComment({ threadId, comment: commentContent })(dispatch)
    ).rejects.toThrow(errorMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.addComment(expect.anything()));
  });
});

describe('threadThunks.asyncUpVoteComment', () => {
  it('should dispatch correct actions when upvote comment succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeCommentId = 'comment-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    commentsAPI.upVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncUpVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.upVoteComment(fakeUserId, fakeCommentId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch vote if upvote fails', async () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const userId = 'user-1';
    const errorMessage = 'Failed to upvote comment';

    commentsAPI.upVote.mockResolvedValue({
      status: 'failed',
      message: errorMessage
    });

    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: userId } });

    await expect(
      threadThunks.asyncUpVoteComment({ threadId, commentId })(dispatch, getState)
    ).rejects.toThrow(errorMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.upVoteComment(userId, commentId));
  });
});

describe('threadThunks.asyncNeutralizeUpVoteComment', () => {
  it('should dispatch correct actions when neutralize up comment succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeCommentId = 'comment-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    commentsAPI.neutralizeVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncNeutralizeUpVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.neutralizeUpVoteComment(fakeUserId, fakeCommentId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if neutralize up comment failed', async () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const errorMessage = 'Failed to neutralize';

    commentsAPI.neutralizeVote = jest.fn().mockResolvedValue({ status: 'failed', message: errorMessage });

    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: 'user-1' } });

    await expect(
      threadThunks.asyncNeutralizeUpVoteComment({ threadId: threadId, commentId: commentId })(dispatch, getState)
    ).rejects.toThrow(errorMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.neutralizeUpVoteComment(expect.anything(), expect.anything()));
  });
});

describe('threadThunks.asyncDownVoteComment', () => {
  it('should dispatch correct actions when down vote comment succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeCommentId = 'comment-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    commentsAPI.downVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncDownVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.downVoteComment(fakeUserId, fakeCommentId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch vote if down vote comment fails', async () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const userId = 'user-1';
    const errorMessage = 'Failed to upvote comment';

    commentsAPI.downVote.mockResolvedValue({
      status: 'failed',
      message: errorMessage
    });

    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: userId } });

    await expect(
      threadThunks.asyncDownVoteComment({ threadId, commentId })(dispatch, getState)
    ).rejects.toThrow(errorMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.downVoteComment(userId, commentId));
  });
});


describe('threadThunks.asyncNeutralizeDownVoteComment', () => {
  it('should dispatch correct actions when neutralize down comment succeeds', async () => {
    const fakeThreadId = 'thread-1';
    const fakeCommentId = 'comment-1';
    const fakeUserId = 'user-1';
    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: fakeUserId } });

    commentsAPI.neutralizeVote.mockResolvedValue({ status: 'success' });

    await threadThunks.asyncNeutralizeDownVoteComment({ threadId: fakeThreadId, commentId: fakeCommentId })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(threadAction.neutralizeDownVoteComment(fakeUserId, fakeCommentId));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error and not dispatch set if neutralize down comment failed', async () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const errorMessage = 'Failed to neutralize';

    commentsAPI.neutralizeVote = jest.fn().mockResolvedValue({ status: 'failed', message: errorMessage });

    const dispatch = jest.fn();
    const getState = () => ({ auth: { id: 'user-1' } });

    await expect(
      threadThunks.asyncNeutralizeDownVoteComment({ threadId: threadId, commentId: commentId })(dispatch, getState)
    ).rejects.toThrow(errorMessage);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(threadAction.neutralizeDownVoteComment(expect.anything(), expect.anything()));
  });
});