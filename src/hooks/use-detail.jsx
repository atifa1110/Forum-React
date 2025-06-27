import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { threadThunks } from '../states/detail/action';
import useVoteThread from './use-vote-detail';

const useThreadDetail = (id) => {
  const dispatch = useDispatch();
  const thread = useSelector((state) => state.thread);
  const [isLoading, setIsLoading] = useState(true);

  const { handleUpVote, handleDownVote } = useVoteThread(
    id,
    thread?.upVotesBy || [],
    thread?.downVotesBy || []
  );

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    const fetchThread = async () => {
      try {
        await dispatch(threadThunks.asyncGetThread(id));
      } finally {
        setIsLoading(false);
      }
    };

    fetchThread();
  }, [dispatch, id]);

  return {
    thread,
    isLoading,
    handleUpVote,
    handleDownVote
  };
};

export default useThreadDetail;
