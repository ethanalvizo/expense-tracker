import firebase from 'firebase/app';
import "firebase/auth"

const config = firebase.initializeApp({
    apiKey: "AIzaSyDqMTZUdJyncEKFmu2zCav5a1Cp709lpc8",
    authDomain: "expense-tracker-76658.firebaseapp.com",
    projectId: "expense-tracker-76658",
    storageBucket: "expense-tracker-76658.appspot.com",
    messagingSenderId: "427877766396",
    appId: "1:427877766396:web:4cc5c06345e7d73c737379"
});

export const auth = config.auth()
export default config;