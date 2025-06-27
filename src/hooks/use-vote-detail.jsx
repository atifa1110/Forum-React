import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { threadThunks } from '../states/detail/action';
import useAuth from './use-auth';

export default function useVoteThread(threadId, upVotesBy = [], downVotesBy = []) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleUpVote = async () => {

    if (!user) {
      toast.warning('You must be logged in to vote');
      return;
    }

    const hasUpvoted = upVotesBy.includes(user.id);
    const hasDownvoted = downVotesBy.includes(user.id);

    if (hasUpvoted) {
      //neutralize with up vote
      await dispatch(threadThunks.asyncNeutralizeUpVoteThread({ threadId }));
    } else {
      //neutralize with down vote
      if (hasDownvoted) {
        await dispatch(threadThunks.asyncNeutralizeDownVoteThread({ threadId }));
      }
      await dispatch(threadThunks.asyncUpVoteThread({ threadId }));
    }
  };

  const handleDownVote = async () => {
    console.log('threadId : ', threadId);
    if (!user) {
      toast.warning('You must be logged in to vote');
      return;
    }

    const hasDownvoted = downVotesBy.includes(user.id);
    const hasUpvoted = upVotesBy.includes(user.id);

    if (hasDownvoted) {
      await dispatch(threadThunks.asyncNeutralizeDownVoteThread({ threadId }));
    } else {
      if (hasUpvoted) {
        await dispatch(threadThunks.asyncNeutralizeUpVoteThread({ threadId }));
      }
      await dispatch(threadThunks.asyncDownVoteThread({ threadId }));
    }
  };

  return { handleUpVote, handleDownVote };
}
