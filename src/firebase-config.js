import { initializeApp } from "firebase/app"; // initialize firebase into the app
import { getAuth } from 'firebase/auth'// we are providing authenitcation to our project now through the authentication libray of the firebase. We are getting the 'getAuth' method/function. basically saying the app would be using authenitication.
import {getFirestore} from 'firebase/firestore'
import { lazy } from "react";
const FirebaseKey = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
    apiKey: 'AIzaSyCtVpmDgfQsFFV6aNMxLw4ldRxbx2mynWs',
    authDomain: "authentication-project-c30f9.firebaseapp.com",
    projectId: "authentication-project-c30f9",
    storageBucket: "authentication-project-c30f9.appspot.com",
    messagingSenderId: "562324960064",
    appId: "1:562324960064:web:29209625b1db75692ac0a5"
  };/// contains the necessary credentials and configuration settings for initializing a Firebase app. // Your web app's Firebase configuration


const app = initializeApp(firebaseConfig);// add to the project with all the features that firebase provides
export const auth = getAuth(app); // are going to globalize the variable to enable the app to get access to it all over the app.The app argument to getAuth(), you can ensure that the authentication service is associated with the desired Firebase app instance in scenarios where multiple Firebase app instances are used within your application. givng it authentication services to the whole application now by passiin f
export const db=getFirestore(app) /// this will initailize the database in the project.

