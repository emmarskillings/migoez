import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import HomeScreen from "../scenes/LoggedIn";
import Profile from "../scenes/Profile";

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen, 
    },
    Profile: {
      screen: props => <Profile onLogout={props.screenProps.onLogout}/>
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "Home":
            break;
          case "Profile":
            break;
        }
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true,
  }
);
