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
  const [uid, setUid]=useState(null)
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

    return signInWithPhoneNumber(Auth, number, recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      console.log(error)
      // Error; SMS not sent
      // ...
    });
;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      currentUser.getIdToken().then((result)=>setUserId(result));
      setUid(currentUser.uid)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logout, phoneSignIn, user, userId,uid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserContext = () => {
  return useContext(AuthContext);
};
