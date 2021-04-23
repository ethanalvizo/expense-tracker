import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDqMTZUdJyncEKFmu2zCav5a1Cp709lpc8",
    authDomain: "expense-tracker-76658.firebaseapp.com",
    projectId: "expense-tracker-76658",
    storageBucket: "expense-tracker-76658.appspot.com",
    messagingSenderId: "427877766396",
    appId: "1:427877766396:web:4cc5c06345e7d73c737379"
}

const fire = firebase.initializeApp(config);
export default fire;