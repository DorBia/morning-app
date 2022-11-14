import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4Rue2LbeiOjz_hnKt6VvI9xGM9EgEUVw",
    authDomain: "my-morning-app.firebaseapp.com",
    projectId: "my-morning-app",
    storageBucket: "my-morning-app.appspot.com",
    messagingSenderId: "79053584412",
    appId: "1:79053584412:web:c5e5f61fdb467623fec7d9"
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore()

// init firebase auth
const auth = getAuth();

// init firebase storage
const storage = getStorage();

export { db, auth, storage }