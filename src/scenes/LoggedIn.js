/**
 * LoggedIn React Component
 * 	After user is signed in
 */

import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { MapView } from "expo";

class LoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      markers: [{latlng: {latitude: 37.78825, longitude: -122.4324}, title: "Test title", description: "Test description"}]
    };
  }

  render() {
    return (<SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.title}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </SafeAreaView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  map: {
    flex: 1
  }
});

export default LoggedIn;
