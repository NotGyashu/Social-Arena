// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const apiKey = String(process.env.FIREBASE_API_KEY);
const authDomain = String(process.env.FIREBASE_AUTH_DOMAIN);
const projectId = String(process.env.FIREBASE_PROJECT_ID);
const storageBucket = String(process.env.FIREBASE_STORAGE_BUCKET);
const messagingSenderId = String(process.env.FIREBASE_MESSAGE_SENDER_ID);
const appId = String(process.env.FIREBASE_APP_ID);
const measurementId = String(process.env.FIREBASE_MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: measurementId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: projectId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);