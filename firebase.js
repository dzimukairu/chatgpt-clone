import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABXXVkhxS6eiJOP7Rsg2YUIkZchTOHPuQ",
  authDomain: "chatgpt-messenger-791ba.firebaseapp.com",
  projectId: "chatgpt-messenger-791ba",
  storageBucket: "chatgpt-messenger-791ba.appspot.com",
  messagingSenderId: "234231407232",
  appId: "1:234231407232:web:dff231fd71b65be232fc65",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
