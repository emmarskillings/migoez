import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyAjzO91d3AUV2fuDDtMXe8h81FMYxttYJQ",
   authDomain: "migoez-1337.firebaseapp.com",
   databaseURL: "https://migoez-1337.firebaseio.com",
   projectId: "migoez-1337",
   storageBucket: "migoez-1337.appspot.com",
   messagingSenderId: "734144645212"
 };

firebase.initializeApp(firebaseConfig);

export default firebase
