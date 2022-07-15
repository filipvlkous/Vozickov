import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import Card from "../../../Shared/Card";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
export default function Revize({ id }) {
  const [revize, setRevize] = useState([]);
  const fetchRevize = async () => {
    await firebase
      .firestore()
      .collection("voziky")
      .doc(id)
      .collection("revize")
      .orderBy("creation", "desc")
      .get()
      .then((snap) =>
        setRevize(
          snap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        )
      );

    console.log("fetchRevize Revize");
  };

  useEffect(() => {
    fetchRevize();
  }, []);
  return (
    <View>
      <View
        style={{
          marginHorizontal: 10,
          paddingTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "RobotoBold",
            fontSize: 19,
          }}
        >
          Revize:
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Revize", "Přejete si přidat revizi?", [
              { text: "Ne", style: "cancel" },
              {
                text: "Ano",
                onPress: async () => {
                  await firebase
                    .firestore()
                    .collection("voziky")
                    .doc(id)
                    .collection("revize")
                    .add({
                      creation: new Date().toLocaleDateString("cs-CZ"),
                    });

                  await firebase
                    .firestore()
                    .collection("voziky")
                    .doc(id)
                    .update({
                      revize: new Date().toLocaleDateString("cs-CZ"),
                    });

                  await fetchRevize();
                },
              },
            ]);
          }}
        >
          <View
            style={{
              padding: 2,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                fontSize: 19,
                paddingRight: 5,
              }}
            >
              Nová
            </Text>
            <AntDesign name="form" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Card>
          {revize.length > 0 ? (
            <View
              style={{
                padding: 15,
                paddingHorizontal: 30,
              }}
            >
              {revize.map((e, i, arr) => (
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          paddingRight: 5,
                          fontFamily: "RobotoBold",
                          fontSize: 17,
                        }}
                      >
                        {i + 1}.{"   "}
                        {e.creation}
                      </Text>
                    </View>
                  </View>

                  {arr.length - 1 === i ? null : (
                    <View
                      style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 0.7,
                        marginVertical: 5,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                padding: 15,
                paddingLeft: 30,
              }}
            >
              <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                Žádné revize
              </Text>
            </View>
          )}
        </Card>
      </View>
    </View>
  );
}
