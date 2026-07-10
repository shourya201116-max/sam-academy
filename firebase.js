// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Replace these values with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "",// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOdaiU8udAXB4r0l61s2gY7Sg8tzUYSCE",
  authDomain: "sam-academy-47081.firebaseapp.com",
  projectId: "sam-academy-47081",
  storageBucket: "sam-academy-47081.firebasestorage.app",
  messagingSenderId: "280246545606",
  appId: "1:280246545606:web:476e95e1ceb9e5bba37bc7",
  measurementId: "G-20QVRYFWBC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
