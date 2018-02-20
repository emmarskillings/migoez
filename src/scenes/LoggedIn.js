/**
* LoggedIn React Component
* 	After user is signed in
*/

import React from 'react';
import { MapView } from 'expo'

import { StyleSheet, View, Text, Button } from 'react-native';

const LoggedIn = ({ onLogout }) => (
	<View style={styles.container}> 
		<Text>Testing thy log in screen</Text>
		<Button onPress={onLogout} 
			title="Log Out"
		/>
	</View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

/*
const LoggedIn = ({ onLogout }) => (
    <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    />
)*/

export default LoggedIn