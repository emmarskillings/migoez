/**
* LoggedOut React Component
* 	User is not signed in
*/

import React, { Component } from "react";
import { StyleSheet, Text, TextInput, Button, SafeAreaView } from "react-native";

class LoggedOut extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		}
	}

	render() {
		const { onRegister, onLogin } = this.props

		return (
		<SafeAreaView style={styles.container}> 
			<Text>Migoez</Text>
			<TextInput style={styles.textInput} 
					   placeholder="Email"
					   onChangeText={(text) => this.setState({ email: text })}
					   value={this.state.email}
			/>
			<TextInput style={styles.textInput} 
					   placeholder="Password"
					   onChangeText={(text) => this.setState({ password: text })}
					   value={this.state.password}
					   secureTextEntry={true}
			/>
			<Button onPress={() => onLogin(this.state.email, this.state.password)} 
					title="Log In"
			/>
			<Button onPress={() => onRegister(this.state.email, this.state.password)} 
					title="Register"
			/>
		</SafeAreaView>)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },

  textInput: {
  	margin: 2,
  	borderColor: "#000000", 
  	borderWidth: 1
  }
})

export default LoggedOut;
