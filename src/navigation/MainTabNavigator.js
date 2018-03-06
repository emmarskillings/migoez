import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../scenes/LoggedIn';
import Profile from '../scenes/Profile';

export default TabNavigator(
  {
    Home: {
      screen: props => {
        console.log(props);
        return <HomeScreen onLogout={props.screenProps.onLogout}/>}
    },
    Profile: {
      screen: Profile,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            break;
          case 'Profile':
            break;
        }
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
