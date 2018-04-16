import firebase from "./config.js";

// getAllEvents
export const getAllEvents = callback => {
  events = [];
  let query = firebase.database().ref();
  query.child("events").once("value", data => {
    for (var entry of Object.entries(data.val())) {
      const idEntry = {
        id: entry[0],
        ...entry[1]
      };
      events = [...events, idEntry];
    }
    callback(events);
  });
};

// setEvent
export const setEvent = (
  { coords, location, title, description, startTime, endTime, userId },
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
    endTime,
    userId
  });
  callback();
};
