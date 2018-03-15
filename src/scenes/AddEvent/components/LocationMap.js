import React from "React";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView, StyleSheet, View } from "react-native";
import config from "../../../api/googlePlaces/config.js";

const LocationMap = ({ onPress }) => (
  <SafeAreaView style={styles.container}>
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      autoFocus={false}
      returnKeyType={"default"}
      fetchDetails={true}
      onPress={onPress}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: config.key,
        language: "en" // language of the results
      }}
      styles={{
        textInputContainer: {
          width: "100%"
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
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default LocationMap;
