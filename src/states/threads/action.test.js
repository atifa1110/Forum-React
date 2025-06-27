import { threadsThunks, threadsAction } from './action';
import { threadsAPI } from '../../api/threads';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

/**
 * test scenario for threadsThunks
 *
 * - asyncCreateThreads
 *   - should dispatch create action when API succeeds
 *   - should throw error if API fails
 *
 * - asyncGetThreads
 *   - should dispatch set action when API succeeds
 *   - should throw error if API fails
 *
 * - asyncUpVoteThread
 *   - should dispatch upVoteThread when success
 *   - should throw error when failed
 *
 * - asyncDownVoteThread
 *   - should dispatch downVoteThread when success
 *   - should throw error when failed
 *
 * - asyncNeutralizeUpVoteThread
 *   - should dispatch neutralizeUpVoteThread when success
 *   - should throw error when failed
 *
 * - asyncNeutralizeDownVoteThread
 *   - should dispatch neutralizeDownVoteThread when success
 *   - should throw error when failed
 */

jest.mock('../../api/threads');
jest.mock('react-redux-loading-bar', () => ({
  showLoading: jest.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: jest.fn(() => ({ type: 'HIDE_LOADING' }))
}));

const fakeUserId = 'user-1';
const fakeThreadId = 'thread-1';
const getState = () => ({ auth: { id: fakeUserId } });

describe('threadsThunks', () => {
  describe('asyncCreateThreads', () => {
    it('should dispatch create action when API succeeds', async () => {
      const fakeThread = { id: 'thread-1', title: 'Test Thread' };
      threadsAPI.newThreats.mockResolvedValue({
        status: 'success',
        thread: fakeThread
      });

      const dispatch = jest.fn();

      await threadsThunks.asyncCreateThreads({
        title: 'Test Thread',
        category: 'general',
        body: 'This is a thread'
      })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(threadsAction.create(fakeThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error if API fails', async () => {
      threadsAPI.newThreats.mockResolvedValue({
        status: 'failed',
        message: 'Something went wrong'
      });

      const dispatch = jest.fn();

      await expect(
        threadsThunks.asyncCreateThreads({ title: 'Fail', category: '', body: '' })(dispatch)
      ).rejects.toThrow('Something went wrong');

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncGetThreads', () => {
    it('should dispatch set action when API succeeds', async () => {
      const fakeThreads = [{ id: 't1' }, { id: 't2' }];
      threadsAPI.getThreats.mockResolvedValue({
        status: 'success',
        threads: fakeThreads
      });

      const dispatch = jest.fn();

      await threadsThunks.asyncGetThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(threadsAction.set(fakeThreads));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error if API fails', async () => {
      threadsAPI.getThreats.mockResolvedValue({
        status: 'failed',
        message: 'Get failed'
      });

      const dispatch = jest.fn();

      await expect(threadsThunks.asyncGetThreads()(dispatch)).rejects.toThrow('Get failed');

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncUpVoteThread', () => {
    it('should dispatch upVoteThread when success', async () => {
      const dispatch = jest.fn();
      const getState = () => ({ auth: { id: fakeUserId } });
      threadsAPI.upVote.mockResolvedValue({ status: 'success' });

      await threadsThunks.asyncUpVoteThread({ threadId: fakeThreadId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(threadsAction.upVoteThread(fakeUserId, fakeThreadId));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error when failed', async () => {
      threadsAPI.upVote.mockResolvedValue({ status: 'failed', message: 'Vote failed' });

      const dispatch = jest.fn();

      await expect(
        threadsThunks.asyncUpVoteThread({ threadId: fakeThreadId })(dispatch, getState)
      ).rejects.toThrow('Vote failed');

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncDownVoteThread', () => {
    it('should dispatch downVoteThread when success', async () => {
      const dispatch = jest.fn();
      const getState = () => ({ auth: { id: fakeUserId } });
      threadsAPI.downVote.mockResolvedValue({ status: 'success' });

      await threadsThunks.asyncDownVoteThread({ threadId: fakeThreadId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(threadsAction.downVoteThread(fakeUserId, fakeThreadId));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error when failed', async () => {
      threadsAPI.downVote.mockResolvedValue({ status: 'failed', message: 'Downvote error' });
      const dispatch = jest.fn();
      await expect(
        threadsThunks.asyncDownVoteThread({ threadId: fakeThreadId })(dispatch, getState)
      ).rejects.toThrow('Downvote error');

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncNeutralizeUpVoteThread', () => {
    it('should dispatch neutralizeUpVoteThread when success', async () => {
      const dispatch = jest.fn();
      const getState = () => ({ auth: { id: fakeUserId } });
      threadsAPI.neutralizeVote.mockResolvedValue({ status: 'success' });

      await threadsThunks.asyncNeutralizeUpVoteThread({ threadId: fakeThreadId })(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(threadsAction.neutralizeUpVoteThread(fakeUserId, fakeThreadId));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should throw error when failed', async () => {
      threadsAPI.neutralizeVote.mockResolvedValue({ status: 'failed', message: 'Neutral fail' });
      const dispatch = jest.fn();
      await expect(
        threadsThunks.asyncNeutralizeUpVoteThread({ threadId: fakeThreadId })(dispatch, getState)
      ).rejects.toThrow('Neutral fail');

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncNeutralizeDownVoteThread', () => {
    it('should dispatch neutralizeDownVoteThread when success', async () => {
      const dispatch = jest.fn();
      const getState = () => ({ auth: { id: fakeUserId } });

      threadsAPI.neutralizeVote.mockResolvedValue({ status: 'success' });

      await threadsThunks.asyncNeutralizeDownVoteThread({ threadId: fakeThreadId })(
        dispatch,
        getState
      );

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(threadsAction.neutralizeDownVoteThread(fakeUserId, fakeThreadId));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });


    it('should throw error when failed', async () => {
      threadsAPI.neutralizeVote.mockResolvedValue({ status: 'failed', message: 'Neutral fail' });

      const dispatch = jest.fn();

      await expect(
        threadsThunks.asyncNeutralizeDownVoteThread({ threadId: fakeThreadId })(dispatch, getState)
      ).rejects.toThrow('Neutral fail');

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
