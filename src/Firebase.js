
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyChOu2MU-n4M2bTwnIJHRwzUcsS2d_UgkM",
  authDomain: "finance-tracker-2cfd0.firebaseapp.com",
  projectId: "finance-tracker-2cfd0",
  storageBucket: "finance-tracker-2cfd0.appspot.com",
  messagingSenderId: "703001768050",
  appId: "1:703001768050:web:447a51737831fc785152eb",
  measurementId: "G-T9GRF3DB5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export { app, analytics, db, auth, provider }