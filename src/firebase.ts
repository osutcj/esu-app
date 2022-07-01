// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDJs4nJhAW65FPfVYIXSBgSjT4uXRMrYV0",

  authDomain: "esu-login.firebaseapp.com",

  projectId: "esu-login",

  storageBucket: "esu-login.appspot.com",

  messagingSenderId: "226106322547",

  appId: "1:226106322547:web:3e0272683add3059eac406",

  measurementId: "G-ZH49Q47E39"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// export const analytics = getAnalytics(app);