// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCx0cLmR7ZevS-q5EDVt1pZIXRZA_W94G4",
  authDomain: "react-movie-app-e3dd4.firebaseapp.com",
  projectId: "react-movie-app-e3dd4",
  storageBucket: "react-movie-app-e3dd4.firebasestorage.app",
  messagingSenderId: "332799912801",
  appId: "1:332799912801:web:021c954ebfea6b58a6b320",
  measurementId: "G-HKJ0CWFQGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
