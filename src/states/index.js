import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import authReducer from './auth/reducer';
import { isPreloadReducer } from './preload/reducer';
import { leaderboardReducer } from './leaderboard/reducer';
import { threadReducer } from './detail/reducer';
import { threadsReducer } from './threads/reducer';
import { usersReducer } from './users/reducer';

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    thread: threadReducer,
    auth: authReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false, // 👈 disables the warning in dev
      immutableCheck: false,
    }),
});

export default store;
