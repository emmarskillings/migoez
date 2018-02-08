/**
* LoggedIn React Component
* 	After user is signed in
*/

import React from 'react';
import { MapView } from 'expo'

const LoggedIn = () => (
    <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    />
)

export default LoggedIn