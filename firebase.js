// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXN7-xZWN0do_8uQjgoMxxh-iBKrcIdF8",
  authDomain: "tp3-web-dbe94.firebaseapp.com",
  projectId: "tp3-web-dbe94",
  storageBucket: "tp3-web-dbe94.appspot.com",
  messagingSenderId: "82369456020",
  appId: "1:82369456020:web:0ff736a420c589fe671181",
  measurementId: "G-QD7EFE7TWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export as default
export default app; // Default export
export { db }; // Named export
