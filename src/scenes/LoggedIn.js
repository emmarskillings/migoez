import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Map from "./Map.js";
import Profile from "./Profile.js";
import AddEvent from "./AddEvent/AddEvent";

export default TabNavigator(
  {
    Home: {
      screen: Map
    },
    AddEvent: {
      screen: AddEvent
    },
    Profile: {
      screen: props => <Profile onLogout={props.screenProps.onLogout} />
    }
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
    swipeEnabled: true
  }
);
