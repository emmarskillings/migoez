import React, { Component } from "react";

import { onLogin, onRegister, onLogout, checkLoginStatus } from "./api/auth.js";

import LoggedOut from "./scenes/LoggedOut";
import LoggedIn from "./scenes/LoggedIn";

export default class Root extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the "user" parameter will either be null
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
   * Don"t forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    // The application is initialising
    if (this.state.loading) return null;

    // The user is an Object, so they"re logged in
    if (this.state.user) return <LoggedIn onLogout={onLogout} />;

    // // The user is null, so they"re logged out
    return <LoggedOut onRegister={onRegister} onLogin={onLogin} />;
  }
}
