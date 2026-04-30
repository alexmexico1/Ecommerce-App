import React, { createContext, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => setUser(res.user));
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => setUser(res.user));
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};