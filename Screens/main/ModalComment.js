import React, { useState } from "react";
import {
  TouchableOpacity,
  Alert,
  View,
  Text,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import { globalStyles } from "../../Styles/Global";
import { Button } from "../../Shared/Button";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { FontAwesome } from "@expo/vector-icons";

export default function ModalComment(props) {
  const [note, setNote] = useState("");
  const currentUser = useSelector((state) => state.userState.currentUser);
  return (
    <Modal transparent={true} visible={props.modalVisible} animationType="fade">
      <View
        style={{
          position: "absolute",
          zIndex: 99,
          width: "100%",
          height: Dimensions.get("screen").height,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000aa",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 9,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                fontSize: 18,
              }}
            >
              Napište poznámku
            </Text>
            <TouchableOpacity onPress={() => props.setModalVisible(false)}>
              <FontAwesome name="close" size={35} color={"#656565"} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder={"Poznámka..."}
            onChangeText={(t) => setNote(t)}
            style={{
              ...globalStyles.input,
              minWidth: Dimensions.get("screen").width - 100,
              minHeight: 100,
            }}
            multiline={true}
          />
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Button
              title={"Uložit"}
              onPress={() => {
                if (note.length >= 2) {
                  Alert.alert("Poznámka", "Přejete si přidat poznámku?", [
                    { text: "Ne", style: "cancel" },
                    {
                      text: "Ano",
                      onPress: async () => {
                        await firebase
                          .firestore()
                          .collection("voziky")
                          .doc(props.id)
                          .collection("comments")
                          .add({
                            comment: note,
                            firstName: currentUser.data.firstName,
                            lastName: currentUser.data.lastName,
                            creation: new Date().toLocaleDateString("cs-CZ"),
                          });
                        await props.fetchComments();
                        await props.setModalVisible(false);
                      },
                    },
                  ]);
                } else {
                  Alert.alert("Chyba", "Moc krátký text");
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
