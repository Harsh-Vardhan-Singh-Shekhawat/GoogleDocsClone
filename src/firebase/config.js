import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdg2T3Tq_Czx9SlRx6ksMDS9ORodXyktI",
  authDomain: "docs-clone-16b4c.firebaseapp.com",
  projectId: "docs-clone-16b4c",
  storageBucket: "docs-clone-16b4c.appspot.com",
  messagingSenderId: "400185485814",
  appId: "1:400185485814:web:90b0a27b9199a741d67fd7",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };

