import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function RegisterForm({ onRegisterSubmit, onLoginClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke parent
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }
    onRegisterSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Your Account</h1>
      <p>Join us and start your journey today.</p>

      <label>Name
        <input
          type="text"
          value={name}
          placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)}
          required />
      </label>

      <label>Email
        <input
          type="email"
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>Password
        <input
          type="password"
          value={password}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>Confirm Password
        <input
          type="password"
          value={confirmPassword}
          placeholder='Enter your confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="register-button">Register</button>

      <p className="signin-text" onClick={onLoginClick}>
        Already have an account? <a href="#">Sign In</a>
      </p>
    </form>
  );
}

RegisterForm.propTypes = {
  onRegisterSubmit: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default RegisterForm;