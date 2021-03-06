import React from "React";
import { TextInput, StyleSheet } from "react-native";

const TextBox = ({ placeholder, onChangeText, value, secureTextEntry }) => (
  <TextInput
    style={styles.textInput}
    placeholder={placeholder}
    onChangeText={text => onChangeText(text)}
    value={value}
    secureTextEntry={secureTextEntry}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#DDDDDD",
    width: "90%",
    margin: 5,
    padding: 5
  }
});

export default TextBox;
