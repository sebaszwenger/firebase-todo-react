// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLbfq0A3aygeMHfcVf9Z0VCmsJF2FVjlY",
  authDomain: "todo-app-da02e.firebaseapp.com",
  projectId: "todo-app-da02e",
  storageBucket: "todo-app-da02e.appspot.com",
  messagingSenderId: "640448905208",
  appId: "1:640448905208:web:cfcccf6a6753f0e430600d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
