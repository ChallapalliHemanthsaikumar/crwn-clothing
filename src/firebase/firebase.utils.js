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

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const collectionRef = firestore.collection('users');
    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get();
    console.log({ collection: collectionSnapshot.docs.map(doc => doc.data())});

  

    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData

        })}
        catch (error){
            console.log("error creating user",error.message);
        }


    }

    return userRef;

}


firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items    }
    });
    return transformCollection.reduce((accumlator, collection) => {
        accumlator[collection.title.toLowerCase()] = collection;
        return accumlator;

    },{});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);

        },reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
  
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);

    });
     return await batch.commit();
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;