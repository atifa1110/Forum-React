import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import '@testing-library/jest-dom';

describe('LoginForm', () => {
  it('should render form fields correctly', () => {
    render(<LoginForm onLoginSubmit={jest.fn()} onRegisterClick={jest.fn()} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('should handle email typing correctly', () => {
    render(<LoginForm onLoginSubmit={jest.fn()} onRegisterClick={jest.fn()} />);

    // Ambil elemen input email
    const emailInput = screen.getByLabelText(/email/i);

    // Simulasikan pengguna mengetik
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Expect input value berubah
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', () => {
    render(<LoginForm onLoginSubmit={jest.fn()} onRegisterClick={jest.fn()} />);

    // Ambil elemen input email
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulasikan pengguna mengetik
    fireEvent.change(passwordInput, { target: { value: '1245678' } });

    // Expect input value berubah
    expect(passwordInput.value).toBe('1245678');
  });

  it('should call onLoginSubmit with email & password when form is submitted', () => {
    const mockSubmit = jest.fn();

    render(<LoginForm onLoginSubmit={mockSubmit} onRegisterClick={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByText(/log in/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    });
  });

  it('should call onRegisterClick when sign up link is clicked', () => {
    const mockRegister = jest.fn();

    render(<LoginForm onLoginSubmit={jest.fn()} onRegisterClick={mockRegister} />);

    fireEvent.click(screen.getByText(/sign up/i));

    expect(mockRegister).toHaveBeenCalled();
  });
});
