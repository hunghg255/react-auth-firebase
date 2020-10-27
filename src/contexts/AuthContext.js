import React, { useState, useEffect } from 'react';

import { auth } from '../firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // sign Up
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Login
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // logOut
  function logOut() {
    return auth.signOut();
  }

  // reset password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  const value = {
    currentUser,
    signUp,
    login,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
