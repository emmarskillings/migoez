import firebase from "./config.js";
import { getUserId } from "./auth.js";

// getAllEvents
export const getAllEvents = callback => {
  let query = firebase.database().ref();
  query.child("events").once("value", data => {
    const events = Object.entries(data.val()).map(event => event = { id: event[0], ...event[1] });
    callback(events);
  });
};

// getUserEvents
export const getUserEvents = userEventsCallback => {
  const userId = getUserId();
  const allEventsCallback = events => {
    const userEvents = events.filter(event => event['userId'] === userId);
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

// deleteEvent
export const deleteEvent = (eventId) => {
  const deleteEventCallback = events => {
    const eventToDelete = events.filter(event => event['id'] === eventId);
    firebase.database().ref("events").child(eventId).remove();
  }
  getUserEvents(deleteEventCallback);
};
