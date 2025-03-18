import { useState, useEffect } from "react";
import authServices from "../services/authServices"; // Your API services for authentication

export const useAuth = () => {
  const [user, setUser] = useState(null); // Current user state
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [error, setError] = useState(null); // To store error during auth process

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authServices.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const user = await authServices.login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    try {
      await authServices.logout();
      setUser(null);
    } catch (error) {
      setError(error);
    }
  };

  return { user, loading, error, login, logout };
};
