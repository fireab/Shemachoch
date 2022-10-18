
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "admin-d9cbb.firebaseapp.com",
  projectId: "admin-d9cbb",
  storageBucket: "admin-d9cbb.appspot.com",
  messagingSenderId: "1096078380897",
  appId: "1:1096078380897:web:cd256c1d2b3862ab917f20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth( )
export const db = getFirestore(app);
export const storage = getStorage(app);