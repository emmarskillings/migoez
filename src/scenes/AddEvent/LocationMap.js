import React, { Component } from "React";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MapView } from "expo";

const LocationMap = () => (
  <SafeAreaView style={styles.container}>
    <GooglePlacesAutocomplete
      placeholder="Enter Location"
      minLength={2}
      autoFocus={false}
      returnKeyType={"default"}
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(details.geometry.location);
        this.setState({ location: details.geometry.location });
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyCIk4o60qIIfiy-t4LXDvCwyLR9O7oGJTU",
        language: "en" // language of the results
      }}
      styles={{
        textInputContainer: {
          width: "100%",
          borderWidth: 0,
          flex: 1,
          alignItems: "center"
        },
        textInput: {
          margin: 2,
          borderColor: "#000000",
          borderWidth: 1
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        }
      }}
      currentLocation={false}
    />
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
    flex: 1
  },
  map: {
    flex: 14
  }
});

export default LocationMap;
