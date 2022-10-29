
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD7enFCvsC7g0XfQFrbXGa_i7cl2dAf3Ts",
	authDomain: "chat-app-newversion-9e273.firebaseapp.com",
	projectId: "chat-app-newversion-9e273",
	storageBucket: "chat-app-newversion-9e273.appspot.com",
	messagingSenderId: "679880278514",
	appId: "1:679880278514:web:ad124c68a679d149bbab6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()