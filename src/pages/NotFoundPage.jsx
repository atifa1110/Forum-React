import { useNavigate } from 'react-router-dom';
import React from 'react';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you’re looking for doesn’t exist or has been moved.</p>
      <button className="home-button" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
}

export default NotFoundPage;
