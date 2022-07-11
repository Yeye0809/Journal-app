// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh0gFdwieJvAMaJz1XrJNdlqf7Q0XBN5M",
  authDomain: "react-cursos-b1571.firebaseapp.com",
  projectId: "react-cursos-b1571",
  storageBucket: "react-cursos-b1571.appspot.com",
  messagingSenderId: "343280711520",
  appId: "1:343280711520:web:5aba7050a2f6c741e21005"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth( firebaseApp ); //funcionalidad de la autenticaion
export const firebaseDB = getFirestore( firebaseApp ); //configuracion de la base de datos