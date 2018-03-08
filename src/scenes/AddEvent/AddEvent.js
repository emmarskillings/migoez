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
import moment from "moment";
import LocationMap from "./LocationMap.js";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      coords: {},
      location: "",
      startTime: moment(),
      endTime: moment(),
      selectingLocation: false,
      selectingStartDate: false,
      selectingEndDate: false
    };
  }

  render() {
    const locationOnPress = (data, details = null) => {
      this.setState({
        coords: details.geometry.location,
        location: details.name,
        selectingLocation: false
      });
    };

    return this.state.selectingLocation ? (
      <LocationMap onPress={locationOnPress} />
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
        <Text>
          {"Start Date: " + this.state.startTime.format("MMMM Do YYYY, h:mm a")}
        </Text>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.selectingStartDate}
          onConfirm={date => {
            formatDate = moment(date);

            this.setState({
              startTime: formatDate,
              endTime: formatDate,
              selectingStartDate: false
            });
          }}
          onCancel={() =>
            this.setState({
              selectingStartDate: false
            })
          }
        />
        <Button
          onPress={() => this.setState({ selectingEndDate: true })}
          title="End Date"
        />
        <Text>
          {"End Date: " + this.state.endTime.format("MMMM Do YYYY, h:mm a")}
        </Text>
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.selectingEndDate}
          date={this.state.endTime.toDate()}
          onConfirm={date => {
            formatDate = moment(date);

            this.setState({
              endTime: formatDate,
              selectingEndDate: false
            });
          }}
          onCancel={() =>
            this.setState({
              selectingEndDate: false
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
