import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import LoginForm from '../component/LoginForm';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async ({ email, password }) => {
    await login({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="left-side">
          <div className="logo">Forum Discussion</div>
          <img
            src="https://applescoop.org/image/wallpapers/iphone/cute-wallpapers-for-girls-feminine-girly-femme-pink-sky-clouds-and-moon-31-10-2024-1730358649-hd-wallpaper.webp"
            alt="Happy woman"
            className="side-image"
          />
          <blockquote>
            “Simply all the tools that <br /> my team and I need.”
          </blockquote>
        </div>

        <div className="right-side">
          <LoginForm onLoginSubmit={handleLoginSubmit} onRegisterClick={() => navigate('/register')} />
        </div>
      </div>
    </div>
  );
}
