import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ onLoginSubmit, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke parent
    onLoginSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome back !</h1>
      <p>Share ideas, ask questions, and grow together with the community.</p>

      <label>
        Email
        <input
          type="email"
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <div className="options-row">
        <label className="remember-label">Remember sign in details
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
        </label>

        <a href="#" className="forgot-password">Forgot password?</a>
      </div>

      <button type="submit" className="login-button">Log in</button>

      <div className="divider">OR</div>

      <button type="button" className="google-button">Continue with Google</button>

      <p className="signup-text" onClick={onRegisterClick}>
        Don’t have an account? <a href="#">Sign up</a>
      </p>
    </form>
  );
}

LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default LoginForm;