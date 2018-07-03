import firebase from "./config.js";
import { getUserId } from "./auth.js";

import geofire from "./geofire.js";

export const getLocalEvents = (center, radius, onEnter, onExit) => {
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
        onEnter({ id: key, ...snapshot.val(), coords: location });
      });
  });

  query.on("key_exited", (key, location, distance) => {
    onExit(key);
  });

  return query;
};

export const updateLocalEvents = (center, radius, query) => {
  query.updateCriteria({
    center,
    radius
  });
};

// getUserEvents
export const getUserEvents = userEventsCallback => {
  const userId = getUserId();

  firebase
    .database()
    .ref()
    .child("events")
    .orderByChild("userId")
    .equalTo(userId)
    .once("value", snapshot => {
      const val = snapshot.val();
      const events =
        val === null
          ? []
          : Object.entries(val).map(event => ({
              id: event[0],
              ...event[1]
            }));
      userEventsCallback(events);
    });
};

// setEvent
export const setEvent = (
  { coords, location, title, description, startTime, endTime, userId, endTimeMilliseconds },
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
    userId,
    endTimeMilliseconds
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

    geofire.remove(eventId);
    callback();
  };
  getUserEvents(deleteEventCallback);
};
