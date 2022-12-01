// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu6NsvkiAXBse60fWlH5cLD0s_ml4hkt4",
  authDomain: "ott-platform-53c35.firebaseapp.com",
  projectId: "ott-platform-53c35",
  storageBucket: "ott-platform-53c35.appspot.com",
  messagingSenderId: "378661326199",
  appId: "1:378661326199:web:5ac200c558f59adebb2572",
};

// Initialize Firebase
const app = getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
