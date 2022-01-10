import { initializeApp } from "firebase/app";
import {getFirestore} from  "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyC7LCn1FUKumnJi1sYI3iBAeTmkpkO61Vk",
    authDomain: "food-ordering-applicatio.firebaseapp.com",
    projectId: "food-ordering-applicatio",
    storageBucket: "food-ordering-applicatio.appspot.com",
    messagingSenderId: "891760433966",
    appId: "1:891760433966:web:41e52a7be6de7c125ff8bf",
    measurementId: "G-WLWF95T52L"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export default getFirestore();
