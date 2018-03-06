import firebase from "./config.js";

// getAllEvents

export const getAllEvents = () => {
  let query = firebase.database().ref("events");
  query.on("child_added", data => {
    console.log(data.val());
  });
};

// setEvent

export const setEvent = (
  latitude,
  longitude,
  title,
  description,
  startTime,
  endTime
) => {
  let newEventRef = firebase
    .database()
    .ref("events")
    .push();
  newEventRef.set({
    latitude,
    longitude,
    title,
    description,
    startTime,
    endTime
  });
};
