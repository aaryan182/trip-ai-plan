// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tripplan-ai.firebaseapp.com",
  projectId: "tripplan-ai",
  storageBucket: "tripplan-ai.appspot.com",
  messagingSenderId: "685292887560",
  appId: "1:685292887560:web:1adc07a3efc867e05c3bbd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)