import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAjJiObvOiwiNO_AsJrYXQNtozI9tUGXdM",
  authDomain: "project-checkins.firebaseapp.com",
  projectId: "project-checkins",
  storageBucket: "project-checkins.appspot.com",
  messagingSenderId: "529976893492",
  appId: "1:529976893492:web:e39a343167af6ed01d2a61",
  measurementId: "G-X6WWCXVT7Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
const txtDB = getFirestore(app);

export { imgDB, txtDB };
