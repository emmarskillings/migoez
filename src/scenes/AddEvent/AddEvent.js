import React, { Component } from "React";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePicker from "react-native-modal-datetime-picker";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      coords: {},
      location: "",
      startTime: "",
      endTime: "",
      selectingLocation: false,
      selectingStartDate: false
    };
  }

  render() {
    return this.state.selectingLocation ? (
      <SafeAreaView style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            this.setState({
              coords: details.geometry.location,
              location: details.name,
              selectingLocation: false
            });
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyCIk4o60qIIfiy-t4LXDvCwyLR9O7oGJTU",
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
    ) : (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Title"
            onChangeText={text => this.setState({ title: text })}
            value={this.state.title}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            multiline={true}
            numberOfLines={3}
            onChangeText={text => this.setState({ description: text })}
            value={this.state.description}
          />
        </View>
        <Button
          onPress={() => this.setState({ selectingLocation: true })}
          title="Select Location"
        />
        <Text>{"Location: " + this.state.location}</Text>
        <Button
          onPress={() => this.setState({ selectingStartDate: true })}
          title="Start Date"
        />
        <Text>{"Start Date: " + this.state.startTime}</Text>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.selectingStartDate}
          onConfirm={date => {
            console.log(date);
            this.setState({
              startTime: date,
              selectingStartDate: false
            });
          }}
          onCancel={() =>
            this.setState({
              selectingStartDate: false
            })
          }
        />
        <Button title="Add Event" onPress={() => console.log("Add Event")} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  textInput: {
    borderColor: "#000000",
    borderWidth: 1
  }
});

export default AddEvent;
