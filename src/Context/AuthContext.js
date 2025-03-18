import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./useAuth"; // Import the custom hook

// Create the AuthContext
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const { user, loading, error, login, logout } = useAuth();

  // Provide the auth state to the rest of the app
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
