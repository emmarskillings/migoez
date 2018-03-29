import firebase from "./config.js";

// getAllEvents
export const getAllEvents = (callback) => {
  let query = firebase.database().ref("events");
  query.on("child_added", data => {
    console.log(data.val());
    callback(data.val());
  });
};

// setEvent
export const setEvent = (
  { coords, location, title, description, startTime, endTime },
  callback
) => {
  let newEventRef = firebase
    .database()
    .ref("events")
    .push();
  newEventRef.set({
    coords,
    location,
    title,
    description,
    startTime,
    endTime
  });
  callback();
};
