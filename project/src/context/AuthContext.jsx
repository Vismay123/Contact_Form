import { createContext, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const userData = {
      name: result.user.displayName,
      email: result.user.email
    };
    login(userData); 
  } catch (error) {
    console.error(error);
    throw error;
  }
};


  return (
    <AuthContext.Provider value={{ user, login, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
