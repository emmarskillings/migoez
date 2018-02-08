import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';

import firebase from './config/firebase';

// Components to display when the user is LoggedIn and LoggedOut 

// Screens for logged in/out - implemented by Sam
import LoggedIn from './src/LoggedIn';
import LoggedOut from './src/LoggedOut';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      this.setState({
        loading: false,
        user,
      });
    });
  }



  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }



  render() {
    // The application is initialising
    if (this.state.loading) return null;
    
    // The user is an Object, so they're logged in
    if (this.state.user) return <LoggedIn onLogout={onLogout}/>;
    
    // The user is null, so they're logged out
    return <LoggedOut onRegister={onRegister} onLogin={onLogin}/>;
  }
}


const onLogin = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the 
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      console.log("Error: ", message)
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}


const onRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Hooray!", user)
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      console.log("Oh no", error)
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}

function onLogout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("Logged out")
  }).catch((error) => {
    console.log("Oh no", error)
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
