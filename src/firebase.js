
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDDwWXIKFHghAVPyEdU3HeKz8bW02n78U8",
  authDomain: "shemachoch-748ea.firebaseapp.com",
  projectId: "shemachoch-748ea",
  storageBucket: "shemachoch-748ea.appspot.com",
  messagingSenderId: "124066408360",
  appId: "1:124066408360:web:0f23b5e85f316c589b1f9d"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth( )
export const db = getFirestore(app);
export const storage = getStorage(app);