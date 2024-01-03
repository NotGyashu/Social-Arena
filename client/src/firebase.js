// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const apiKey = String(process.env.FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "socialarena-d6016.firebaseapp.com",
  projectId: "socialarena-d6016",
  storageBucket: "socialarena-d6016.appspot.com",
  messagingSenderId: "922364075517",
  appId: "1:922364075517:web:f5d2563eb849d5c150cd94",
  measurementId: "G-K5WWVX2NS2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);