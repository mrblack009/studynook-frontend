import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/auth/me');
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log('No active session.');
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const registerUser = async (name, email, photoUrl, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, photoUrl, password });
      toast.success(response.data.message || 'Registration successful! Please login.');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return false;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      toast.success(response.data.message || 'Logged in successfully!');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
      return false;
    }
  };

  const googleLoginUser = async (idToken) => {
    try {
      const response = await api.post('/auth/google-login', { idToken });
      setUser(response.data.user);
      toast.success(response.data.message || 'Successfully logged in with Google!');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Google Login failed';
      toast.error(msg);
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        googleLoginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};