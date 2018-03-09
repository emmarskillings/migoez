import React from "react";
import { StyleSheet, View, Button, SafeAreaView } from "react-native";

const Profile = ({ onLogout }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.button}>
      <Button onPress={onLogout} title="Log Out" />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
});

export default Profile;
