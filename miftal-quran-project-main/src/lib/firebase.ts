import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Replace with your own config
const firebaseConfig = {
apiKey: "AIzaSyCx3bOiL1Xi5XTHOb-MsO2BJRWT1gmDolw",
  authDomain: "ayan-2088e.firebaseapp.com",
  projectId: "ayan-2088e",
  storageBucket: "ayan-2088e.firebasestorage.app",
  messagingSenderId: "901696210455",
  appId: "1:901696210455:web:91cac9592f2069a43fbe52",
  measurementId: "G-6JV224BLJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
