// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4lzwKUfPCn_GY--2pw7G2PGRs0fW8WPo",
  authDomain: "crypto-db-2bcc5.firebaseapp.com",
  projectId: "crypto-db-2bcc5",
  storageBucket: "crypto-db-2bcc5.appspot.com",
  messagingSenderId: "461500069731",
  appId: "1:461500069731:web:e8f0e5c68e567dfba2c556",
  measurementId: "G-SFWS21YB9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { analytics };