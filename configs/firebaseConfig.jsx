// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "aicourse-7d38b.firebaseapp.com",
  projectId: "aicourse-7d38b",
  storageBucket: "aicourse-7d38b.firebasestorage.app",
  messagingSenderId: "237865603668",
  appId: "1:237865603668:web:d2ae470cbeec47b07113c1",
  measurementId: "G-M53YNL5LQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)