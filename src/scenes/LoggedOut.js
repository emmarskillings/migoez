/**
 * LoggedOut React Component
 * 	User is not signed in
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  SafeAreaView
} from "react-native";
import TextBox from "./components/TextBox.js";

class LoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { onRegister, onLogin } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Migoez</Text>
        <TextBox
          placeholder={"Email"}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          value={this.state.email}
        />
        <TextBox
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        />
        <View style={styles.buttonsContainer}>
          <ButtonView
            onPress={() => onLogin(this.state.email, this.state.password)}
            title="Log In"
          />
          <ButtonView
            onPress={() => onRegister(this.state.email, this.state.password)}
            title="Register"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const ButtonView = ({ onPress, title }) => (
  <View style={styles.button}>
    <Button onPress={onPress} title={title} />
  </View>
);

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button: {
    marginTop: 5
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default LoggedOut;
