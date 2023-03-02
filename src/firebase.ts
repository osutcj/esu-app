// Import the functions you need from the SDKs you need

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, MessagePayload, onMessage } from "firebase/messaging";

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
