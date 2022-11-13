
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCx23vxtkMzdVWJfaHpbrGwMxiH4u-GkXo",
	authDomain: "chat-app-newversion-bed5a.firebaseapp.com",
	projectId: "chat-app-newversion-bed5a",
	storageBucket: "chat-app-newversion-bed5a.appspot.com",
	messagingSenderId: "123354069855",
	appId: "1:123354069855:web:66ffe2f6955d3dccd914ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()