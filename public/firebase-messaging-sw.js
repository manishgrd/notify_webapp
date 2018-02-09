importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js");

//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-auth.js");
//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-database.js");
//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-firestore.js");
//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-storage.js");


// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1vO8nYgT1LrzLHpVnwvk4_q2sL-SgITM",
    authDomain: "hpdfgt.firebaseapp.com",
    databaseURL: "https://hpdfgt.firebaseio.com",
    projectId: "hpdfgt",
    storageBucket: "hpdfgt.appspot.com",
    messagingSenderId: "77453129528"
  };
  firebase.initializeApp(config);

  const swmsg = firebase.messaging();
