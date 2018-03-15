import React, { Component } from "React";
import { StyleSheet, SafeAreaView, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import TextButton from "./TextButton.js";
import moment from "moment";

class DurationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectingStartDate: false,
      selectingEndDate: false
    };
  }

  render() {
    const { startTime, startOnConfirm, endTime, endOnConfirm } = this.props;
    console.log(startTime);
    return (
      <View style={styles.container}>
        <TextButton
          onPress={() => this.setState({ selectingStartDate: true })}
          title="Start"
          text={startTime.format("MMMM Do YYYY, h:mm a")}
        />
        <TextButton
          onPress={() => this.setState({ selectingEndDate: true })}
          title="End"
          text={endTime.format("MMMM Do YYYY, h:mm a")}
        />
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.selectingStartDate}
          onConfirm={date => {
            formatDate = moment(date);
            startOnConfirm(formatDate);
            this.setState({
              selectingStartDate: false
            });
          }}
          onCancel={() =>
            this.setState({
              selectingStartDate: false
            })
          }
        />
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.selectingEndDate}
          date={endTime.toDate()}
          onConfirm={date => {
            formatDate = moment(date);
            endOnConfirm(formatDate);
            this.setState({
              selectingEndDate: false
            });
          }}
          onCancel={() =>
            this.setState({
              selectingEndDate: false
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default DurationPicker;
