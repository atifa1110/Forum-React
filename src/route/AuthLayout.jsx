import { Outlet } from 'react-router-dom';
import React from 'react';

function AuthLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
