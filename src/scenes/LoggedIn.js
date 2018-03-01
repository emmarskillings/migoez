/**
 * LoggedIn React Component
 * 	After user is signed in
 */

import React from "react";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import { MapView } from "expo";

const LoggedIn = ({ onLogout }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.button}>
      <Text>Testing thy log in screen</Text>
      <Button onPress={onLogout} title="Log Out" />
    </View>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    />
  </SafeAreaView>
);

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
  map: {
    flex: 6
  }
});

export default LoggedIn;
