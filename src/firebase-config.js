// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAP3XU9chWMd0TwkMfbQNyGFX54OyTxm8U",
  authDomain: "blog-aab20.firebaseapp.com",
  projectId: "blog-aab20",
  storageBucket: "blog-aab20.appspot.com",
  messagingSenderId: "74561457347",
  appId: "1:74561457347:web:24cae52f21b01fd5306676",
  measurementId: "G-ECF5HNT1QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export const db =getFirestore(app);
export {auth,provider};
export const storage = getStorage(app);