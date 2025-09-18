import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_yKP7Ns40tkbuu4QEvJMRjnZ5Waq_A0I",
  authDomain: "todo-81be9.firebaseapp.com",
  projectId: "todo-81be9",
  storageBucket: "todo-81be9.appspot.com", // ← 修正
  messagingSenderId: "748199005225",
  appId: "1:748199005225:web:bae2ec72d72b413639a038",
  // measurementId は削除してOK
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
