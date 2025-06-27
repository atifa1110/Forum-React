import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { threadThunks } from '../states/detail/action';

const useAddComment = (id) => {
  const dispatch = useDispatch();

  const addComment = async (comment) => {
    try {
      await dispatch(threadThunks.asyncAddComment({
        threadId: id,
        comment,
      }));
      toast.success('Success add new comment');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return addComment;
};

export default useAddComment;
