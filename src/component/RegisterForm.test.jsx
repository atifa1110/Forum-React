import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('should render form fields correctly', () => {
    render(<RegisterForm onRegisterSubmit={jest.fn()} onLoginClick={jest.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('should handle name typing correctly', () => {
    render(<RegisterForm onRegisterSubmit={jest.fn()} onLoginClick={jest.fn()} />);

    // Ambil elemen input email
    const nameInput = screen.getByLabelText(/name/i);

    // Simulasikan pengguna mengetik
    fireEvent.change(nameInput, { target: { value: 'test' } });

    // Expect input value berubah
    expect(nameInput.value).toBe('test');
  });

  it('should handle email typing correctly', () => {
    render(<RegisterForm onRegisterSubmit={jest.fn()} onLoginClick={jest.fn()} />);

    // Ambil elemen input email
    const emailInput = screen.getByLabelText(/email/i);

    // Simulasikan pengguna mengetik
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Expect input value berubah
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', () => {
    render(<RegisterForm onRegisterSubmit={jest.fn()} onLoginClick={jest.fn()} />);

    // Ambil elemen input email
    const passwordInput = screen.getByLabelText(/^password$/i);

    // Simulasikan pengguna mengetik
    fireEvent.change(passwordInput, { target: { value: '1245678' } });

    // Expect input value berubah
    expect(passwordInput.value).toBe('1245678');
  });

  it('should call onRegisterSubmit with email & password when form is submitted', () => {
    const mockSubmit = jest.fn();

    render(<RegisterForm onRegisterSubmit={mockSubmit} onLoginClick={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'test' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText(/register/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'test',
      email: 'test@example.com',
      password: '123456'
    });
  });

  it('should NOT call onRegisterSubmit when passwords do not match', () => {
    const mockSubmit = jest.fn();
    render(<RegisterForm onRegisterSubmit={mockSubmit} onLoginClick={() => {}} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'test' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'abcde' },
    });

    fireEvent.click(screen.getByText(/register/i));

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should call onLoginClick when sign up link is clicked', () => {
    const mockLogin = jest.fn();

    render(<RegisterForm onRegisterSubmit={jest.fn()} onLoginClick={mockLogin} />);

    fireEvent.click(screen.getByText(/sign in/i));

    expect(mockLogin).toHaveBeenCalled();
  });
});
