import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDcrd2P3bIkNL3inl1VEKyE4oMpOHVLk-M",
  authDomain: "migoez-9be0e.firebaseapp.com",
  databaseURL: "https://migoez-9be0e.firebaseio.com",
  projectId: "migoez-9be0e",
  storageBucket: "migoez-9be0e.appspot.com",
  messagingSenderId: "191751734968"
};

firebase.initializeApp(firebaseConfig);

export default firebase
