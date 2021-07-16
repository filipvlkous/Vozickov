import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { fetchVoziky } from "../../Redux/Action/index";
import firebase from "firebase";
require("firebase/firestore");
import { globalStyles, Colors } from "../../Styles/Global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function ModalVozik(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
    >
      <View
        style={{
          flex: 1,
          alignContent: "center",
          backgroundColor: "rgba(52, 52, 52, 0.1)",
        }}
      >
        <View
          style={{
            paddingTop: 80,
            flex: 0,
            alignItems: "flex-end",
            paddingRight: 50,
          }}
        >
          <TouchableOpacity onPress={() => props.setModalVisible(false)}>
            <FontAwesome name="close" size={50} color={Colors.secondColor} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 60 }}>
          <MaterialCommunityIcons
            name="account-box"
            size={26}
            color={Colors.secondColor}
          />
          <Text style={styles.text}>JMÉNO</Text>
        </View>
        <TextInput
          placeholder={"Jméno..."}
          onChangeText={(t) => setFirstName(t)}
          style={globalStyles.input}
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
          placeholder={"Příjmení..."}
          onChangeText={(t) => setLastName(t)}
          style={globalStyles.input}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => {
              if (firstName.length >= 2 && lastName.length >= 2) {
                Alert.alert("Rezervace", "Přejete si rezervovat?", [
                  { text: "Ne", style: "cancel" },
                  {
                    text: "Ano",
                    onPress: async () => {
                      await firebase
                        .firestore()
                        .collection("voziky")
                        .doc(props.id)
                        .update({
                          firstName: firstName,
                          lastName: lastName,
                          fyzioFirstName: props.currentUser.data.firstName,
                          fyzioLastName: props.currentUser.data.lastName,
                          rezervace: props.currentUser.uid,
                          creation: new Date().toLocaleDateString("cs-CZ"),
                        })
                        .then(props.fetchVoziky());
                      await props.navigation.popToTop();
                      await props.setModalVisible();
                    },
                  },
                ]);
              } else {
                Alert.alert("Chyba", "Moc krátké jméno nebo příjmení.");
              }
            }}
          >
            <Text style={styles.ButtonText}> Rezervace</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "RobotoBold",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  ButtonContainer: {
    marginTop: 15,
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
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ModalVozik);
