import React from "react";
import { TouchableOpacity, Alert, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

export default function Logout() {
  return (
    <TouchableOpacity
      style={{ paddingRight: 25, paddingBottom: 10 }}
      onPress={() => {
        Alert.alert("Logout", "Do you want logout?", [
          { text: "Cancel" },
          {
            text: "Ok",
            onPress: () => {
              firebase.auth().signOut();
            },
          },
        ]);
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons name={"login-variant"} size={35} />
        <Text>Odhlasit</Text>
      </View>
    </TouchableOpacity>
  );
}
