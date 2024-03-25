// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRV2ajbTTslW-lfVsIhMyLQ2c7CosmgVE",
  authDomain: "personal-website-7c885.firebaseapp.com",
  projectId: "personal-website-7c885",
  storageBucket: "personal-website-7c885.appspot.com",
  messagingSenderId: "910356626400",
  appId: "1:910356626400:web:3a5740125a578587bf4985",
  measurementId: "G-ZY4CGV6VGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);