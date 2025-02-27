// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurazione di Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiUBpvP6xCW6U4IJEM4ls58Hv6towMFcA",
  authDomain: "dj-adrian-musica.firebaseapp.com",
  projectId: "dj-adrian-musica",
  storageBucket: "dj-adrian-musica.appspot.com",
  messagingSenderId: "140616808292",
  appId: "1:140616808292:web:6a9799bf4278ab1ee96c71",
  measurementId: "G-BNK38WT1XS",
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
