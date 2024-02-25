// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Use `initializeAuth` for RN
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxv0F0R_CJK-S0lM14dhB_qL1hyJotufE",
  authDomain: "learning-app-v2-704ab.firebaseapp.com",
  databaseURL:
    "https://learning-app-v2-704ab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learning-app-v2-704ab",
  storageBucket: "learning-app-v2-704ab.appspot.com",
  messagingSenderId: "376462922950",
  appId: "1:376462922950:web:36b33471139c566ff173c7",
  measurementId: "G-H4NYTSM8D8",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
