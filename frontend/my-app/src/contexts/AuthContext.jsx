import { createContext, useContext, useState, useEffect } from 'react';
import { currentUser } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      // TODO: Replace with actual token validation
      const token = localStorage.getItem('authToken');
      if (token) {
        // For demo purposes, we'll simulate a logged-in user
        // But for now, let's start with unauthenticated state
        // setUser(currentUser);
        // setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Django uses `username`, not email by default
          username: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens in localStorage (or cookies if needed)
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        // Save user info from token response
        const user = {
          username: data.username,
          email: data.email,
          isAdmin: data.is_admin
        };

        setUser({
          username: data.name, // use real name instead of username
          email: data.email,
          avatar: null // since you don’t want a real image
        });
        setIsAuthenticated(true);

        return { success: true };
      } else {
        return { success: false, error: data.detail || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Server error. Try again later.' };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Auto-login
        const loginResult = await login({ email: userData.email, password: userData.password });
        if (loginResult.success) {
          return { success: true };
        } else {
          return { success: false, error: 'Signup succeeded, but auto-login failed.' };
        }
      }
       else {
        const errorMsg =
          data?.email?.[0] || data?.username?.[0] || data?.password?.[0] || 'Signup failed.';
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      if (!response.ok) {
      console.log('Error response:', data);

      const errorMsg =
        data?.email?.[0] || data?.username?.[0] || data?.password?.[0] || data?.detail || 'Signup failed.';

      return { success: false, error: errorMsg };
    }
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 