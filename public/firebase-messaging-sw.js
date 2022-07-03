// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {

  apiKey: "AIzaSyASli7LHQYLTGC3bpDtPUYkDUv2kT6B2D8",

  authDomain: "join-esu.firebaseapp.com",

  projectId: "join-esu",

  storageBucket: "join-esu.appspot.com",

  messagingSenderId: "726143564131",

  appId: "1:726143564131:web:df2b5bd1b64c7edd30bb56",

  measurementId: "G-3M9F09V276"

};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});