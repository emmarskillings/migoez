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

class AddEvent extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			description: "",
			coords: {},
			startTime: "",
			endTime: ""
		};
	}

	render() {
		return (
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
						onChangeText={text =>
							this.setState({ description: text })
						}
						value={this.state.description}
					/>
				</View>
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
