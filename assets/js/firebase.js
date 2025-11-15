// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFVh5nkRh1EybF_blyfbjiL9YbOgD6mAI",
  authDomain: "ms-riti-learning-center.firebaseapp.com",
  projectId: "ms-riti-learning-center",
  storageBucket: "ms-riti-learning-center.firebasestorage.app",
  messagingSenderId: "415426858098",
  appId: "1:415426858098:web:75c0838f98e37aedf946eb",
  measurementId: "G-6BVDY0GM9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);