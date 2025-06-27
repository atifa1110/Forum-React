import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { threadThunks } from '../states/detail/action';
import useAuth from './use-auth';

export default function useVoteComment(threadId, commentId, upVotesBy = [], downVotesBy = []) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const hasUpvoted = user ? upVotesBy.includes(user.id) : false;
  const hasDownvoted = user ? downVotesBy.includes(user.id) : false;

  const handleUpVoteComment = async () => {

    if (!user) {
      toast.warning('You must be logged in to vote');
      return;
    }

    if (hasUpvoted) {
      //neutralize with up vote
      await dispatch(threadThunks.asyncNeutralizeUpVoteComment({ threadId, commentId }));
    } else {
      //neutralize with down vote
      if (hasDownvoted) {
        await dispatch(threadThunks.asyncNeutralizeDownVoteComment({ threadId, commentId }));
      }
      await dispatch(threadThunks.asyncUpVoteComment({ threadId, commentId }));
    }
  };

  const handleDownVoteComment = async () => {
    console.log('threadId : ', threadId);
    if (!user) {
      toast.warning('You must be logged in to vote');
      return;
    }

    if (hasDownvoted) {
      await dispatch(threadThunks.asyncNeutralizeDownVoteComment({ threadId, commentId }));
    } else {
      if (hasUpvoted) {
        await dispatch(threadThunks.asyncNeutralizeUpVoteComment({ threadId, commentId }));
      }
      await dispatch(threadThunks.asyncDownVoteComment({ threadId, commentId }));
    }
  };

  return { hasUpvoted, hasDownvoted, handleUpVoteComment, handleDownVoteComment };
}
