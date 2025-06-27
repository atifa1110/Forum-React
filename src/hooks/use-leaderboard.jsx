import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leaderboardThunks } from '../states/leaderboard/action';

export default function useLeaderboard() {
  const [isLoadData, setIsLoadData] = useState(true);
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  useEffect(() => {
    (async () => {
      if (isLoadData) {
        await dispatch(leaderboardThunks.asyncSetLeaderboard());
        setIsLoadData(false);
      }
    })();
  }, [dispatch, isLoadData]);

  return { leaderboard, isLoadData };
}
