import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../Styles/Global";

export function Button({ onPress, title }) {
  TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
  return (
    <TouchableOpacity onPress={onPress} style={styles.ButtonContainer}>
      <Text style={styles.ButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function ButtonOutline({ onPress, title }) {
  TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
  return (
    <TouchableOpacity onPress={onPress} style={styles.ButtonOutlineContainer}>
      <Text style={styles.ButtonOutlineText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.primeColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  ButtonOutlineContainer: {
    elevation: 8,
    backgroundColor: "#eeeeee",
    borderColor: Colors.primeColor,
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
  },
  ButtonOutlineText: {
    fontSize: 18,
    color: Colors.primeColor,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
