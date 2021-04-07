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
  const [caption, setCaption] = useState("");
  const [sirka, setSirka] = useState("");
  const [hloubka, setHloubka] = useState("");
  const [delka, setDelka] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(props);

  const uploadImage = async () => {
    setIsLoading(true);
    const uri = props.route.params.image;

    const childPath = `voziky/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        setIsLoading(false);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    Alert.alert;
    firebase
      .firestore()
      .collection("voziky")
      .add({
        downloadURL,
        caption,
        delka,
        hloubka,
        sirka,
        name,
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
            <Text style={styles.text}>Popis</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište popis . . ."
              multiline
              onChangeText={(caption) => setCaption(caption)}
            />
            <Text style={styles.text}>Hloubka</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište hloubku . . ."
              keyboardType="number-pad"
              onChangeText={(hloubka) => setHloubka(hloubka)}
            />
            <Text style={styles.text}>Šířka</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Napište šířku . . ."
              keyboardType="number-pad"
              onChangeText={(sirka) => setSirka(sirka)}
            />
            <Text style={styles.text}>Délka</Text>
            <TextInput
              style={{ ...globalStyles.input, paddingTop: 10 }}
              placeholder="Napiste délku . . ."
              keyboardType="number-pad"
              onChangeText={(delka) => setDelka(delka)}
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
