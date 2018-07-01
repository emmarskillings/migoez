import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { getLocalEvents, updateLocalEvents } from "../api/events.js";

const KILO_PER_DELTA = 150;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      location: null,
      delta: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      query: null
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  componentDidMount() {
    this.getLocationAndEvents();
    this.props.navigation.setParams({ handleTabFocus: this.handleTabFocus });
  }
  getLocationAndEvents = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission is not granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    const center = [location.coords.latitude, location.coords.longitude];

    const onEnter = marker => {
      this.setState({ markers: [...this.state.markers, marker] });
    };
    const onExit = markerId => {
      this.setState({
        markers: this.state.markers.filter(marker => marker.id !== markerId)
      });
    };
    let query = getLocalEvents(
      center,
      this.state.delta.latitudeDelta * KILO_PER_DELTA,
      onEnter,
      onExit
    );
    this.setState({ location: center, query });
  };

  handleTabFocus = () => {
    //this.getLocationAndEvents();
  };

  onRegionChangeComplete(region) {
    if (this.state.query !== null) {
      const { latitudeDelta, longitudeDelta } = region;
      const center = [region.latitude, region.longitude];
      const radius = latitudeDelta * KILO_PER_DELTA;
      updateLocalEvents(center, radius, this.state.query);
      this.setState({
        location: center,
        delta: { latitudeDelta, longitudeDelta }
      });
    }
  }

  render() {
    return this.state.location === null ? null : (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.location[0],
            longitude: this.state.location[1],
            latitudeDelta: this.state.delta.latitudeDelta,
            longitudeDelta: this.state.delta.longitudeDelta
          }}
          onRegionChangeComplete={this.onRegionChangeComplete}
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
