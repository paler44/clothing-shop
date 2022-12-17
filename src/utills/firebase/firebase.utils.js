import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD7WH5HMp7PSqhfhgLbz-0SpPkOJv1G7RA",
    authDomain: "crwn-clothing-db-b2913.firebaseapp.com",
    projectId: "crwn-clothing-db-b2913",
    storageBucket: "crwn-clothing-db-b2913.appspot.com",
    messagingSenderId: "246100510437",
    appId: "1:246100510437:web:46bc2678b39d7784fcb60c",
    measurementId: "G-ZZT19DKNXS"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch(error){
          console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}