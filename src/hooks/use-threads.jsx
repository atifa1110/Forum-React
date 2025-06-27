import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { threadsThunks } from '../states/threads/action';
import { usersThunks } from '../states/users/action';

export function useThreads(searchParams, selectedCategories = [], sortBy) {
  const dispatch = useDispatch();

  const keyword = searchParams.get('search')?.toLowerCase() || '';

  const [isLoadData, setIsLoadData] = useState(true);

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoadData) {
      (async () => {
        try {
          await dispatch(usersThunks.asyncGetUsers());
          await dispatch(threadsThunks.asyncGetThreads());
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadData(false);
        }
      })();
    }
  }, [dispatch, isLoadData]);

  const filteredThreads = useMemo(() => {
    if (isLoadData) return [];

    let filtered = threads;

    // Filter by keyword
    if (keyword) {
      filtered = filtered.filter((thread) =>
        thread.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Filter by selected categories (if any)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((thread) =>
        selectedCategories.includes(thread.category.toLowerCase())
      );
    }

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'trending') {
      filtered.sort((a, b) => b.upVotesBy.length - a.upVotesBy.length);
    }

    return filtered.map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }));
  }, [threads, users, keyword, selectedCategories, sortBy, isLoadData]);

  return { filteredThreads, isLoadData };
}
