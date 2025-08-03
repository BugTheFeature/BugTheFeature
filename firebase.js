// Firebase-Initialisierung
const firebaseConfig = {
    apiKey: "AIzaSyDiGX9aX7oHSK58-_nF9xYOvj3voKOSs6c",
    authDomain: "ausbildernamen.firebaseapp.com",
    databaseURL: "https://ausbildernamen-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ausbildernamen",
    storageBucket: "ausbildernamen.firebasestorage.app",
    messagingSenderId: "1079376960699",
    appId: "1:1079376960699:web:85014c8aafe554529a1d9e"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  