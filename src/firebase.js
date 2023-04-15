// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf-WsIsBTiTLZkamQDP8bnBsnnAX4_hmU",
  authDomain: "marvelous-45332.firebaseapp.com",
  projectId: "marvelous-45332",
  storageBucket: "marvelous-45332.appspot.com",
  messagingSenderId: "446504899748",
  appId: "1:446504899748:web:afa5345143c9fbdc388231",
  measurementId: "G-ZN5V3Q05T8",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
export { db };
