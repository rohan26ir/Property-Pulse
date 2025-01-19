import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider()

const Provider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");


  console.log(user);
  

  // Create new user

  const createNewUser =(name, photoUrl , email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, name, photoUrl, email , password)
  }

 


  // sign in
  const logIn = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // sign in with Google
  const signInWithGoogle = () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }




  const authInfo = {
    user,
    setUser,
    signInWithGoogle,
    createNewUser,
    logIn,
    loading,
    message,
    setMessage,
  };
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return() =>{
      unsubscribe()
    }
  },[])



  return (
    <AuthContext.Provider value={authInfo}>
           {children}
    </AuthContext.Provider>
  )
};

export default Provider;