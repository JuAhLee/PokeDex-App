// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChjNRM5PSGu5qEkJOVmFWr1lgd-M8Lo7w",
  authDomain: "react-pokedex-app-8fac1.firebaseapp.com",
  projectId: "react-pokedex-app-8fac1",
  storageBucket: "react-pokedex-app-8fac1.appspot.com",
  messagingSenderId: "1096284708459",
  appId: "1:1096284708459:web:881f09686eda27e6455b2e",
  measurementId: "G-7BQFKM0PQ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;
