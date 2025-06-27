import { useDispatch } from 'react-redux';
import { threadsThunks } from '../states/threads/action';
import { toast } from 'react-toastify';

export default function useCreateThread(onSuccess = () => {}) {
  const dispatch = useDispatch();

  const createThread = async ({ title, category, body }) => {
    try {
      dispatch(threadsThunks.asyncCreateThreads({ title, category, body }));
      dispatch(threadsThunks.asyncGetThreads()); // Refresh threads
      toast.success('Success add new thread');
      onSuccess(); // e.g., close modal
    } catch (error) {
      toast.error(error.message);
    }
  };

  return createThread;
}
