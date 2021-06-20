import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
    apiKey: "AIzaSyCQpP-hLdDRjJSAhEx_Ggwl9YtEz-CeHIs",
    authDomain: "crwn-db-5fe41.firebaseapp.com",
    projectId: "crwn-db-5fe41",
    storageBucket: "crwn-db-5fe41.appspot.com",
    messagingSenderId: "766052386726",
    appId: "1:766052386726:web:5aff1239bee2e56b1ab167",
    measurementId: "G-391Z8EMY3B"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;