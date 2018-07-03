const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// whenever a new event is added, delete events with past endTimes
exports.deleteExpiredEvents = functions.database.ref('/events/{pushId}').onWrite((change) => {
  const eventsRef = change.after.ref.parent; // reference to the parent
  const now = moment().valueOf();
  const eventsQuery = eventsRef.orderByChild('endTimeMilliseconds').endAt(now);
  return eventsQuery.once('value').then((eventsSnapshot) => {
    // create a map with all children that need to be removed
    const eventsUpdates = {};
    eventsSnapshot.forEach(child => {
      eventsUpdates[child.key] = null;
    });
    // execute all updates in one go
    eventsRef.update(eventsUpdates);
    
  	const locationsRef = change.after.ref.root.child('locations');
    return locationsRef.once('value').then((locationsSnapshot) => {
	    // create a map with all children that need to be removed
	    const locationsUpdates = {};
	    locationsSnapshot.forEach(child => {
	      if (child.key in eventsUpdates) {
	      	locationsUpdates[child.key] = null;
	      }
	    });
	    // execute updates and return the result to end the function
	    return locationsRef.update(locationsUpdates);
	  });
  });
});
