import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyDOppST1Ry91x8KTWiAWud7znptXn8tzXo",
    authDomain: "authentication-d18e5.firebaseapp.com",
    projectId: "authentication-d18e5",
    storageBucket: "authentication-d18e5.appspot.com",
    messagingSenderId: "351574004833",
    appId: "1:351574004833:web:27b4a02bae0d8061454620",
    measurementId: "G-NLQZVMM5LN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);