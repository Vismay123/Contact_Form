import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd_A5oeMYkBKsLvahN4-D2-JTkUvsYBQs",
  authDomain: "contact-form-9638b.firebaseapp.com",
  projectId: "contact-form-9638b",
  storageBucket: "contact-form-9638b.firebasestorage.app",
  messagingSenderId: "481526446767",
  appId: "1:481526446767:web:fd1d8b716496e1b94e725a",
  measurementId: "G-CTD4LP5QNX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
