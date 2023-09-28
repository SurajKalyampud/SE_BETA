
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEvayE5NsVbcxO6WLuWvPk6eodp6TYHwk",
  authDomain: "ecommerce-3df69.firebaseapp.com",
  projectId: "ecommerce-3df69",
  storageBucket: "ecommerce-3df69.appspot.com",
  messagingSenderId: "773994343860",
  appId: "1:773994343860:web:9a2edb090bfbb4202756e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)