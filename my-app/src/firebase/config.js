// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDm-HD1PTmtUaj3q6PgaI406-hZKxpvSak",
  authDomain: "parkinsonsdataapp.firebaseapp.com",
  projectId: "parkinsonsdataapp",
  storageBucket: "parkinsonsdataapp.appspot.com",
  messagingSenderId: "57156691833",
  appId: "1:57156691833:web:5a52f0285887baa656b1a8",
  measurementId: "G-JF3WEZGBK4",
  databaseURL: "https://parkinsonsdataapp-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);




export default app;