import React, { Component } from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Map from "./Map.js";
import Profile from "./Profile.js";
import AddEvent from "./AddEvent/AddEvent";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const TabNavigation = TabNavigator(
      {
        Map: {
          screen: Map
        },
        AddEvent: {
          screen: AddEvent
        },
        Profile: {
          screen: props => <Profile {...props} onLogout={this.props.onLogout} />
        }
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarOnPress: ({ scene, jumpToIndex }) => {
            if (scene.index == 0) {
              navigation.state.params.handleTabFocus();
            }
            jumpToIndex(scene.index);
          },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom",
        animationEnabled: true,
        swipeEnabled: true
      }
    );

    return <TabNavigation />;
  }
}

export default LoggedIn;
