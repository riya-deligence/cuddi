import { useContext, createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Auth } from "../firebase";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const navigation = useNavigate()
  const logout = () => {
    return signOut(Auth);
  };

  const phoneSignIn = (number) => {
    const recaptchaVerifier =  new RecaptchaVerifier('sign-in-phone', {
  'size': 'invisible',
  'callback': (response) => {
   
    // reCAPTCHA solved, allow signInWithPhoneNumber.
  }
}, Auth);
    recaptchaVerifier.render();

    return signInWithPhoneNumber(Auth, number, recaptchaVerifier);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      setUserId(currentUser.uid);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logout, phoneSignIn, user, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserContext = () => {
  return useContext(AuthContext);
};