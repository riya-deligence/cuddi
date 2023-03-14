// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOVmA7ChO8P5RfU0GrNbuNS--ru6Fw--0",
  authDomain: "cuddi-c63b5.firebaseapp.com",
  projectId: "cuddi-c63b5",
  storageBucket: "cuddi-c63b5.appspot.com",
  messagingSenderId: "1048478221164",
  appId: "1:1048478221164:web:4a260602c7569a52532949",
  measurementId: "G-HMSXBQK5F3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
