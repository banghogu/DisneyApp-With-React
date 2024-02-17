// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUHyOcM4qsIEnxkidWdj3koHfMkf_ILlM",
  authDomain: "react-diseney-app.firebaseapp.com",
  projectId: "react-diseney-app",
  storageBucket: "react-diseney-app.appspot.com",
  messagingSenderId: "457142395766",
  appId: "1:457142395766:web:15022c6fb6cfaa654cd057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;