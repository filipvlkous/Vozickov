import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import firebase from "firebase";
import { globalStyles, Colors } from "../../Styles/Global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button as ButtonCustom, ButtonOutline } from "../../Shared/Button";

export default function Landing({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // .then((result) => {
      //   console.log("Success " + result);
      // })
      .catch(() => {
        alert("Špatné heslo nebo email!");
      });
  };
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginBottom: 30,
              marginTop: "20%",
            }}
          >
            <Text style={{ fontSize: 30, fontFamily: "RobotoRegular" }}>
              VOZÍČKOV
            </Text>
          </View>
          <View style={styles.textInput}>
            <MaterialCommunityIcons
              name="email"
              size={26}
              color={Colors.secondColor}
            />
            <Text style={styles.text}>EMAIL</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder="Email..."
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            autoFocus={true}
            onChangeText={(t) => setEmail(t)}
          />
          <View style={[styles.textInput, { marginTop: 10 }]}>
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
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <ButtonCustom title="Přihlásit" onPress={() => onLogin()} />
          </View>
          {/* <View style={styles.neboContainer}>
            <Text style={styles.nebo}> Nebo</Text>
          </View>
          {Platform.OS === "ios" ? (
            <Button
              color={Colors.primeColor}
              title="Registerace"
              onPress={() => navigation.navigate("Register")}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <ButtonOutline
                title="Registrace"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          )} */}
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
    color: Colors.secondColor,
  },
  textInput: { flexDirection: "row", marginHorizontal: 60 },
  neboContainer: { alignItems: "center", padding: 20 },
});
