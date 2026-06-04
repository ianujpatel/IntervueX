
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "intervuex-b6e0c.firebaseapp.com",
  projectId: "intervuex-b6e0c",
  storageBucket: "intervuex-b6e0c.firebasestorage.app",
  messagingSenderId: "295528458263",
  appId: "1:295528458263:web:dd6e7e97a64b608cc35452"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }