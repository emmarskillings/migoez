import firebase from "./config.js";
import { getUserId } from "./auth.js";

import geofire from "./geofire.js";

export const getLocalEvents = (center, radius, callback) => {
  let query = geofire.query({
    center,
    radius
  });

  let events = firebase.database().ref("events");
  query.on("key_entered", (key, location, distance) => {
    events
      .child(key)
      .once("value")
      .then(snapshot => {
        callback({ id: key, ...snapshot.val(), coords: location });
      });
  });
};

// getUserEvents
export const getUserEvents = userEventsCallback => {
  const userId = getUserId();
  const allEventsCallback = events => {
    const userEvents = events.filter(event => event["userId"] === userId);
    userEventsCallback(userEvents);
  };
  getAllEvents(allEventsCallback);
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
  geofire
    .set({
      [newEventRef.key]: [parseFloat(coords["lat"]), parseFloat(coords["lng"])]
    })
    .then(
      () => {
        console.log("Added to geofire");
      },
      error => {
        console.log(error);
      }
    );
  newEventRef.set({
    location,
    title,
    description,
    startTime,
    endTime,
    userId
  });
  callback();
};

// deleteEvent
export const deleteEvent = (eventId, callback) => {
  const deleteEventCallback = events => {
    firebase
      .database()
      .ref("events")
      .child(eventId)
      .remove();
    callback();
  };
  getUserEvents(deleteEventCallback);
};
