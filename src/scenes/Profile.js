import React, { Component } from "react";
import { StyleSheet, View, Button, SafeAreaView, Text } from "react-native";
import { getUserEvents } from "../api/events.js";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userEvents: []
    };
  }

  componentDidMount() {
    const callback = userEvents => {
      this.setState({ userEvents });
    };
    getUserEvents(callback);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.button}>
          <Text> My events </Text>
          <Button onPress={this.props.onLogout} title="Log Out" />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
});

export default Profile;
