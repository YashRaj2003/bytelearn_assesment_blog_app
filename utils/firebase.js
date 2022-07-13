// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqw1BiFcpSUv9N85QO2hs9qTT0U2-t3fw",
    authDomain: "blog-post-14975.firebaseapp.com",
    projectId: "blog-post-14975",
    storageBucket: "blog-post-14975.appspot.com",
    messagingSenderId: "141610351807",
    appId: "1:141610351807:web:90260fb9244b18bf4b1a0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };