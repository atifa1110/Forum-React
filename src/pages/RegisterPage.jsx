import React from 'react';
import useAuth from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../component/RegisterForm';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async ({ name, email, password }) => {
    await register({ name, email, password });
  };

  return (
    <div className="register-container">
      <div className="register-form">
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
          <RegisterForm onRegisterSubmit={handleRegisterSubmit} onLoginClick={() => navigate('/login')} />
        </div>
      </div>
    </div>
  );
}
