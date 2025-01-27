import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const axiosInstance = useAxiosPublic();

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
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
              try {
                  const userInfo = { email: currentUser.email };
                  const response = await axiosInstance.post('/jwt', userInfo);
                  if (response.data.token) {
                      localStorage.setItem('access-token', response.data.token);
                  }
              } catch (error) {
                  console.error("Error generating JWT:", error);
                  setErrorMessage("Failed to generate token.");
              }
          } else {
              localStorage.removeItem('access-token');
          }
          setLoading(false);
      });

      return () => unsubscribe();
  }, [axiosInstance]);

  return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
