// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1VomJMSnWGxpFCOTo3pDDDsCq2zi28CI",
  authDomain: "summa-bd26b.firebaseapp.com",
  projectId: "summa-bd26b",
  storageBucket: "summa-bd26b.appspot.com",
  messagingSenderId: "6138750096",
  appId: "1:6138750096:web:fc59721ac023a5673c6415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)