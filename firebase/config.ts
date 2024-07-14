// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBnYskB5bghg4O3DYQd4arGdxgiS0UEogE",
  authDomain: "glimpse-prc.firebaseapp.com",
  databaseURL: "https://glimpse-prc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "glimpse-prc",
  storageBucket: "glimpse-prc.appspot.com",
  messagingSenderId: "794325041221",
  appId: "1:794325041221:web:07dc1ef2dc244f9fd5232c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { db, app, rtdb };
