// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQikuXpkupYV5sIDpj7oPVsMdLUxm_omM",
  authDomain: "flashcards-d6a4a.firebaseapp.com",
  projectId: "flashcards-d6a4a",
  storageBucket: "flashcards-d6a4a.appspot.com",
  messagingSenderId: "389758612895",
  appId: "1:389758612895:web:df4fb220d55af00ff279aa",
  measurementId: "G-3SMV502BME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
