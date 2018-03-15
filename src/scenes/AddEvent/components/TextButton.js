import React from "React";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const TextButton = ({ onPress, title, placeholder, text }) => {
  const mainText = shouldShowPlaceholder(placeholder, text) ? (
    <Text
      style={{
        color: "gray"
      }}
    >
      {placeholder}
    </Text>
  ) : (
    <Text>{text}</Text>
  );

  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      {title === undefined ? (
        mainText
      ) : (
        <View>
          <Text>
            {title + ": "} {mainText}
          </Text>
        </View>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: "#DDDDDD",
    width: "90%"
  }
});

const shouldShowPlaceholder = (placeholder, text) =>
  text === "" && placeholder !== "";

export default TextButton;
