import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { getLocalEvents } from "../api/events.js";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      location: null
    };

    this._sub = 0;
  }

  componentDidMount() {
    this.getLocationAndEvents();
  }
  getLocationAndEvents = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission is not granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    const center = [location.coords.latitude, location.coords.longitude];
    getLocalEvents(center, 7, marker => {
      this.setState({ markers: [...this.state.markers, marker] });
    });
    this.setState({ location: center });
  };

  handleTabFocus = () => {
    const callback = markers => {
      this.setState({ markers });
    };
    getAllEvents(callback);
    this.getLocationAsync();
  };

  componentDidMount() {
    this.handleTabFocus();
    this.props.navigation.setParams({ handleTabFocus: this.handleTabFocus });
  }

  render() {
    return this.state.location === null ? null : (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.location[0],
            longitude: this.state.location[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={{
                latitude: marker.coords[0],
                longitude: marker.coords[1]
              }}
              title={marker.title}
              description={marker.description}
            >
              <MapView.Callout>
                <Text> {marker.title} </Text>
                <Text> {marker.description} </Text>
                <Text> {marker.location} </Text>
                <Text> {marker.startTime} </Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
      </SafeAreaView>
    );
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

export default Map;
