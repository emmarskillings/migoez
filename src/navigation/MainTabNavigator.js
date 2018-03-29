import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import HomeScreen from "../scenes/LoggedIn";
import Profile from "../scenes/Profile";
import AddEvent from "../scenes/AddEvent/AddEvent";

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen, 
    },
    AddEvent: {
      screen: AddEvent,
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
          case "AddEvent":
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
