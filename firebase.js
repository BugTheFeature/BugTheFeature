import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiGX9aX7oHSK58-_nF9xYOvj3voKOSs6c",
  authDomain: "ausbildernamen.firebaseapp.com",
  projectId: "ausbildernamen",
  storageBucket: "ausbildernamen.appspot.com",
  messagingSenderId: "1079376960699",
  appId: "1:1079376960699:web:85014c8aafe554529a1d9e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
