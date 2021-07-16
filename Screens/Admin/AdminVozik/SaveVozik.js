import React, { useState } from "react";
import { globalStyles } from "../../../Styles/Global";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchVoziky } from "../../../Redux/Action/index";
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Button } from "../../../Shared/Button";
import firebase from "firebase";

function SaveVozik(props) {
  const [name, setName] = useState("");
  const [šířka, setSirka] = useState(null);
  const [hloubka, setHloubka] = useState(null);
  const [výška, setVyska] = useState(null);
  const [číslo, setCislo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async () => {
    if (
      name === "" ||
      výška === "" ||
      šířka === "" ||
      hloubka === "" ||
      číslo === ""
    ) {
      return Alert.alert("Chyba", "Vyplňte všechna pole", ["ok"]);
    } else {
      setIsLoading(true);
      const uri = props.route.params.image;

      const childPath = `voziky/${Math.random().toString(36)}`;

      const response = await fetch(uri);
      const blob = await response.blob();

      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {};

      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          savePostData(snapshot);
          setIsLoading(false);
        });
      };

      const taskError = (snapshot) => {};

      task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
  };
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("voziky")
      .add({
        downloadURL,
        výška,
        hloubka,
        šířka,
        name,
        číslo,
        rezervace: null,
      })
      .then(() => {
        props.fetchVoziky();
        props.navigation.popToTop();
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Image source={{ uri: props.route.params.image }} />
          <View
            style={{ flex: 1, height: "70%", justifyContent: "space-evenly" }}
          >
            <Text style={styles.text}>Jméno</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište jméno . . ."
              onChangeText={(name) => setName(name)}
            />
            <Text style={styles.text}>Číslo vozíku</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište číslo vozíku . . ."
              keyboardType="number-pad"
              onChangeText={(number) => setCislo(Number(number))}
            />

            <Text style={styles.text}>Hloubka</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište hloubku . . ."
              keyboardType="number-pad"
              onChangeText={(hloubka) => setHloubka(Number(hloubka))}
            />
            <Text style={styles.text}>Šířka</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište šířku . . ."
              keyboardType="number-pad"
              onChangeText={(sirka) => setSirka(Number(sirka))}
            />
            <Text style={styles.text}>Výška</Text>
            <TextInput
              style={{ ...globalStyles.input, paddingTop: 10 }}
              placeholder="Napiste výšku . . ."
              keyboardType="number-pad"
              onChangeText={(vyska) => setVyska(Number(vyska))}
            />
            <View style={{ alignItems: "center", marginTop: 30 }}>
              {isLoading === false ? (
                <Button title="Uložit" onPress={() => uploadImage()} />
              ) : (
                <ActivityIndicator size="large" color="#999999" />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(null, mapDispatchProps)(SaveVozik);

const styles = StyleSheet.create({
  text: {
    paddingLeft: 80,
    fontSize: 16,
    fontFamily: "RobotoBold",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
