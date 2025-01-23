import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // console.log("User state:", JSON.stringify(user, null, 2));

  // Create new user
  const createNewUser = (email, password, name, photoUrl) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        // Update profile with name and photo
        return updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photoUrl });
          return user; // Return updated user object
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Sign in
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error("Login error:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // Log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const authInfo = {
    user,
    setUser,
    signInWithGoogle,
    createNewUser,
    logOut,
    logIn,
    loading,
    message,
    setMessage,
    errorMessage,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
