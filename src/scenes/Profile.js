import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  FlatList,
  Alert
} from "react-native";
import { getUserEvents, deleteEvent } from "../api/events.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: []
    };
  }

  handleTabFocus = () => {
    const callback = userEvents => {
      this.setState({ userEvents });
    };
    getUserEvents(callback);
  };

  handleDelete = eventId => {
    const callback = () => {
      this.handleTabFocus();
    };
    deleteEvent(eventId, callback);
  };

  componentDidMount() {
    const willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.handleTabFocus();
      }
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center" }}> Your events: </Text>
        <FlatList
          data={this.state.userEvents}
          renderItem={({ item }) => (
            <Button
              title={item.title}
              onPress={() =>
                Alert.alert(
                  "Are you sure you want to delete this event?",
                  "This action cannot be undone!",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => this.handleDelete(item.id) }
                  ],
                  { cancelable: false }
                )
              }
            />
          )}
          keyExtractor={(item, index) => item.title}
        />
        <Text style={{ textAlign: "center" }}>
          {" "}
          Hint: Tap any event to delete it!{" "}
        </Text>
        <Button
          style={styles.button}
          onPress={this.props.onLogout}
          title="Log Out"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default Profile;
