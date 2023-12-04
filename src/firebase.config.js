import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkPGgwJIVcifK7ChUxuy8oNUoX5xQTI6Q",
  authDomain: "checkins-ba86d.firebaseapp.com",
  projectId: "checkins-ba86d",
  storageBucket: "checkins-ba86d.appspot.com",
  messagingSenderId: "632140206040",
  appId: "1:632140206040:web:43956ab0d962d874e4ecad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
const txtDB = getFirestore(app);

export { imgDB, txtDB };
