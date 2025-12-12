// firebase.js
// Firebase configuration and initialization

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace these values with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firestore database instance
const db = getFirestore(app);

// Authentication instance
const auth = getAuth(app);

// Google Sign-In provider
const googleProvider = new GoogleAuthProvider();

// Export instances for use in App.js
export { app, db, auth, googleProvider };
