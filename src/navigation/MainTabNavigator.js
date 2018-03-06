import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import HomeScreen from '../scenes/LoggedIn';
import Profile from '../scenes/Profile';

export default TabNavigator(
  {
    Home: {
      screen: props => <HomeScreen onLogout={props.screenProps.onLogout}/>
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Home':
            break;
          case 'Profile':
            break;
        }
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
