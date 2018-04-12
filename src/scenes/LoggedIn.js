/**
 * LoggedIn React Component
 * 	After user is signed in
 */

import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { MapView } from "expo";
import { getAllEvents } from "../api/events.js";

class LoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
  }

  componentDidMount() {
    const callback = (markers) => { this.setState({markers}) }
    getAllEvents(callback);
  }

  render() {
    return (<SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.2625998,
          longitude: -123.1193748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.id}
            coordinate={{ latitude: marker.coords.lat, longitude: marker.coords.lng }}
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
