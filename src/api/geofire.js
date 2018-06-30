import geofire from "geofire";
import firebase from "./config.js";

const firebaseRef = firebase.database().ref("locations");
const eventGeofire = new geofire(firebaseRef);

export default eventGeofire;
