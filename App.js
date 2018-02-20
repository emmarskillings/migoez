import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";

import firebase from "./src/api/config";
import {
  onLogin,
  onRegister,
  onLogout,
  checkLoginStatus
} from "./src/api/auth.js";

import LoggedIn from "./src/scenes/LoggedIn";
import LoggedOut from "./src/scenes/LoggedOut";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = checkLoginStatus(user => {
      this.setState({
        loading: false,
        user
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
    if (this.state.user) return <LoggedIn onLogout={onLogout} />;

    // The user is null, so they're logged out
    return <LoggedOut onRegister={onRegister} onLogin={onLogin} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  modules: {
    margin: 20
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center"
  }
});
