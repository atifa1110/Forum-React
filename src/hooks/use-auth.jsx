import { useDispatch, useSelector } from 'react-redux';
import { authThunks } from '../states/auth/action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      await dispatch(authThunks.asyncLogin({ email, password }));
      toast.success('Logged in successfully! Please Welcome');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      await dispatch(authThunks.asyncRegister({ name, email, password }));
      toast.success('Registered successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    try {
      dispatch(authThunks.asyncLogout());
      toast.info('Logged out');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return { user, login, register, logout };
}
