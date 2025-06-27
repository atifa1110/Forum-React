import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isPreloadThunks } from '../states/preload/action';

/**
 * Custom hook untuk preload auth user saat pertama kali app dijalankan.
 * @returns {boolean} isPreload - status apakah preload masih berjalan
 */
const usePreloadAuth = () => {
  const dispatch = useDispatch();
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(isPreloadThunks.asyncPreload());
  }, [dispatch]);

  return isPreload;
};

export default usePreloadAuth;
