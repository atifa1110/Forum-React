import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './route/MainLayout';
import AuthLayout from './route/AuthLayout';
import NotFoundPage from './pages/NotFoundPage';
import LeaderboardPage from './pages/LeaderboardPage';
import usePreloadAuth from './hooks/use-preload-auth';

function App() {
  const isPreload = usePreloadAuth(); // 👈 panggil hook preload

  if (isPreload) {
    return <div>Loading app...</div>; // atau bisa pakai komponen loader
  }

  return (
    <Routes>
      {/* Main layout routes (with header) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/thread/:id" element={<DetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        {/* Add more pages that need header here */}
      </Route>

      {/* Auth layout routes (no header) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add more pages that should not show header here */}
      </Route>

      {/* Not Found route - must be last */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
