import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCiGPqk8b9r79ocIRZyVfcQxYgYYeekLVA",
  authDomain: "music-tym.firebaseapp.com",
  projectId: "music-tym",
  storageBucket: "music-tym.appspot.com",
  messagingSenderId: "1070261095816",
  appId: "1:1070261095816:web:290bcb4e649f4436f73e3d",
  measurementId: "G-C91TVT0SGG"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);