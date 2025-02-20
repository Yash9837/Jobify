import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwb2qX_htcFbtPaUNrEfL2gCyU5xDiT20",
  authDomain: "jobify-636d1.firebaseapp.com",
  projectId: "jobify-636d1",
  storageBucket: "jobify-636d1.appspot.com",  // ✅ FIXED (Correct storageBucket URL)
  messagingSenderId: "795339567454",
  appId: "1:795339567454:web:a4adfc959bcfebd9cc5fcf",
  measurementId: "G-G4TB94LHMS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);  // ✅ Added Firebase Storage

export { auth, db, storage };
