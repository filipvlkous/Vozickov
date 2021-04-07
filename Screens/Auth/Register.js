import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles, Colors } from "../../Styles/Global";
import { Button as ButtonCustom } from "../../Shared/Button";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // DODELAT CINFIRM PASSWORDS
  const onRegister = () => {
    if (password === passwordConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({ firstName, lastName, email });
        })
        .catch((error) => {
          Alert.alert(error);
        });
    } else {
      Alert.alert("Chyba", "Hesla se liší!.", { text: "ok" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={Platform.OS === "ios" ? { flex: 1 } : { flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ marginVertical: 30 }}>
          <View style={{ flexDirection: "row", marginHorizontal: 60 }}>
            <MaterialCommunityIcons
              name="account-box"
              size={26}
              color={Colors.secondColor}
            />
            <Text style={styles.text}>JMÉNO</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder="Jméno..."
            autoCapitalize={"words"}
            autoCompleteType={"off"}
            autoFocus={true}
            onChangeText={(t) => setFirstName(t)}
          />
          <View style={{ flexDirection: "row", marginHorizontal: 60 }}>
            <MaterialCommunityIcons
              name="account-box-outline"
              size={26}
              color={Colors.secondColor}
            />
            <Text style={styles.text}>PŘÍJMENÍ</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder="Příjmení..."
            autoCapitalize={"words"}
            autoCompleteType={"off"}
            onChangeText={(t) => setLastName(t)}
          />
          <View style={{ flexDirection: "row", marginHorizontal: 60 }}>
            <MaterialCommunityIcons name="email" size={26} color={"#656565"} />
            <Text style={styles.text}>EMAIL</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder="Email..."
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            onChangeText={(t) => setEmail(t)}
          />
          <View style={{ flexDirection: "row", marginHorizontal: 60 }}>
            <MaterialCommunityIcons
              name="lock"
              size={26}
              color={Colors.secondColor}
            />
            <Text style={styles.text}>HESLO</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            placeholder="Heslo..."
            autoCompleteType={"off"}
            onChangeText={(t) => setPassword(t)}
          />
          <View style={{ flexDirection: "row", marginHorizontal: 60 }}>
            <MaterialCommunityIcons
              name="lock-check"
              size={26}
              color={Colors.secondColor}
            />
            <Text style={styles.text}>POTVRDIT HESLO</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            secureTextEntry
            placeholder="Potvrdit Heslo..."
            autoCompleteType={"off"}
            onChangeText={(t) => setPasswordConfirm(t)}
          />
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <ButtonCustom title="Registrace" onPress={() => onRegister()} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "RobotoBold",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  nebo: {
    fontSize: 15,
    fontFamily: "RobotoBold",
    color: "#656565",
  },
  neboContainer: { alignItems: "center", padding: 20 },
});
