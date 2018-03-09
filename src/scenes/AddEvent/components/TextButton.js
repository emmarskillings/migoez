import React, { Component } from "React";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const TextButton = ({ onPress, text }) => (
  <TouchableHighlight onPress={onPress}>
    <Text>{text}</Text>
  </TouchableHighlight>
);

export default TextButton;
