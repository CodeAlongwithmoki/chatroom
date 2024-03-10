// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH0SIZQ_OvaicnT9PcvqHfMHGjESo8jLo",
  authDomain: "chatroom-4d873.firebaseapp.com",
  projectId: "chatroom-4d873",
  storageBucket: "chatroom-4d873.appspot.com",
  messagingSenderId: "368979318606",
  appId: "1:368979318606:web:3534823e7249ece2aa301f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
