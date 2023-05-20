import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdg2T3Tq_Czx9SlRx6ksMDS9ORodXyktI",
  authDomain: "docs-clone-16b4c.firebaseapp.com",
  projectId: "docs-clone-16b4c",
  storageBucket: "docs-clone-16b4c.appspot.com",
  messagingSenderId: "400185485814",
  appId: "1:400185485814:web:90b0a27b9199a741d67fd7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "@firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBdg2T3Tq_Czx9SlRx6ksMDS9ORodXyktI",
//   authDomain: "docs-clone-16b4c.firebaseapp.com",
//   projectId: "docs-clone-16b4c",
//   storageBucket: "docs-clone-16b4c.appspot.com",
//   messagingSenderId: "400185485814",
//   appId: "1:400185485814:web:90b0a27b9199a741d67fd7",
//   measurementId: "G-FC4PYMBDHD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// const analytics = getAnalytics(app);