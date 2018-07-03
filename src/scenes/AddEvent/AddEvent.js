import React, { Component } from "React";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  Alert
} from "react-native";
import moment from "moment";
import { getUserId } from "../../api/auth.js";
import { setEvent } from "../../api/events.js";
import LocationMap from "./components/LocationMap.js";
import TextButton from "./components/TextButton.js";
import DurationPicker from "./components/DurationPicker.js";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      title: "",
      description: "",
      coords: {},
      location: "",
      startTime: moment(),
      endTime: moment().add(1, "hours"),
      userId: getUserId(),
      selectingLocation: false
    };
  }

  checkFieldsThenSend() {
    if (this.state.title === "") {
      Alert.alert("Cannot Save Event", "Please enter a title");
    } else if (this.state.location === "") {
      Alert.alert("Cannot Save Event", "Please enter a location");
    } else if (this.state.endTime.isBefore(this.state.startTime)) {
      Alert.alert(
        "Cannot Save Event",
        "The start date must be before the end date"
      );
    } else {
      const sentState = {
        ...this.state,
        startTime: this.state.startTime.format("MMMM Do YYYY, h:mm a"),
        endTime: this.state.endTime.format("MMMM Do YYYY, h:mm a"),
        endTimeMilliseconds: this.state.endTime.valueOf()
      };
      const callback = () => Alert.alert("Event Successfully Added");
      setEvent(sentState, callback);
      this.setState(this.getInitialState());
    }
  }

  render() {
    const locationOnPress = (data, details = null) => {
      this.setState({
        coords: details.geometry.location,
        location: details.name + ", " + details.formatted_address,
        selectingLocation: false
      });
    };

    return this.state.selectingLocation ? (
      <LocationMap onPress={locationOnPress} />
    ) : (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          onChangeText={text => this.setState({ title: text })}
          value={this.state.title}
        />
        <TextInput
          style={[styles.textInput, { height: 70 }]}
          placeholder="Description"
          multiline={true}
          numberOfLines={3}
          onChangeText={text => this.setState({ description: text })}
          value={this.state.description}
        />

        <TextButton
          onPress={() => this.setState({ selectingLocation: true })}
          placeholder="Select Location"
          text={this.state.location}
        />
        <DurationPicker
          startTime={this.state.startTime}
          startOnConfirm={date =>
            this.setState({ startTime: date, endTime: date })
          }
          endTime={this.state.endTime}
          endOnConfirm={date => this.setState({ endTime: date })}
        />
        <Button
          style={styles.button}
          title="Add Event"
          onPress={() => {
            this.checkFieldsThenSend();
          }}
        />
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
    backgroundColor: "#DDDDDD",
    width: "90%",
    margin: 5,
    padding: 5
  },

  button: {
    margin: 5,
    padding: 5
  }
});

export default AddEvent;
