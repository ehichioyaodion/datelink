// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCNu00A9zk8Ocl95TZw5InzK9IYprENve0',
  authDomain: 'app-datelink.firebaseapp.com',
  projectId: 'app-datelink',
  storageBucket: 'app-datelink.firebasestorage.app',
  messagingSenderId: '977078934846',
  appId: '1:977078934846:web:323d0d300cf8a2ffb3a06f',
  measurementId: 'G-Z6Y3Q42KR5',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
