import { initializeApp } from "firebase/app";

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'


// 1. create new project on firebase console
// 2. enable email and password auth provider in authentication
// 3. create a web app and copy the firebseConfigs below 

const firebaseConfig = {
  apiKey: "AIzaSyDK4ahydpvwVK9549lObJfZ_lF87gEoFB4",
  authDomain: "chatlingo-2a81b.firebaseapp.com",
  projectId: "chatlingo-2a81b",
  storageBucket: "chatlingo-2a81b.appspot.com",
  messagingSenderId: "221420342462",
  appId: "1:221420342462:web:f7c589affe63ac2edd62ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
