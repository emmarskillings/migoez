import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import {
  onLogin,
  onRegister,
  onLogout,
  checkLoginStatus
} from "../api/auth.js";

import LoggedOut from '../scenes/LoggedOut'
import MainTabNavigator from './MainTabNavigator';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: props => <MainTabNavigator screenProps = {{onLogout: onLogout}}/>
    },
  },
  {
    headerMode: 'none',
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerVisible: false,
    }),
  },
);

class RootNavigator extends Component {
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
    if (this.state.user) return <RootStackNavigator />;

    // // The user is null, so they're logged out
    return <LoggedOut onRegister={onRegister} onLogin={onLogin} />;
  }
}

export default RootNavigator;
