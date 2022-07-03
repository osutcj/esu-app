// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, MessagePayload, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {

//   apiKey: "AIzaSyDJs4nJhAW65FPfVYIXSBgSjT4uXRMrYV0",

//   authDomain: "esu-login.firebaseapp.com",

//   projectId: "esu-login",

//   storageBucket: "esu-login.appspot.com",

//   messagingSenderId: "226106322547",

//   appId: "1:226106322547:web:3e0272683add3059eac406",

//   measurementId: "G-ZH49Q47E39"

// };

const firebaseConfig = {

  apiKey: "AIzaSyASli7LHQYLTGC3bpDtPUYkDUv2kT6B2D8",

  authDomain: "join-esu.firebaseapp.com",

  projectId: "join-esu",

  storageBucket: "join-esu.appspot.com",

  messagingSenderId: "726143564131",

  appId: "1:726143564131:web:df2b5bd1b64c7edd30bb56",

  measurementId: "G-3M9F09V276"

};



// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const messaging = getMessaging(app);

export const vapidKey = 'BCL3Tt536DuZ6_E4afpvjVfkdFSV2V8VHCNu4MyWw4JWNSrjtOwIqzG5FqbMMgvtktmLgY36UvE_t6odZHOmaYw';

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
