import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyASHesEHcJDBvzBlL15b5gzsIiv6cpkBlo",
    authDomain: "chatroom-react-gb.firebaseapp.com",
    databaseURL: "https://chatroom-react-gb-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "chatroom-react-gb",
    storageBucket: "chatroom-react-gb.appspot.com",
    messagingSenderId: "675718905479",
    appId: "1:675718905479:web:092436c9813ca97b0c0222"
};

export const app = firebase.initializeApp(config);

export const db = firebase.database();
