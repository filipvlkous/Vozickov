import React from "react";
import { View, Text, Alert } from "react-native";
import Card from "../../Shared/Card";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
export default function Comments({
  fetchComments,
  id,
  comments,
  setModalVisible,
}) {
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
          Poznámky:
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
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
          {comments.length > 0 ? (
            <View
              style={{
                padding: 15,
                paddingHorizontal: 30,
              }}
            >
              {comments.map((e, i, arr) => (
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
                        {e.firstName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "RobotoBold",
                          fontSize: 17,
                        }}
                      >
                        {e.lastName}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: "RobotoBold",
                        fontSize: 17,
                      }}
                    >
                      {e.creation}
                    </Text>
                  </View>
                  <Text>{e.comment}</Text>
                  <View
                    style={{
                      position: "absolute",
                      left: "105%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert("Smazat", "Chcete smazat poznamku?", [
                          { text: "Ne", style: "cancel" },
                          {
                            text: "Ano",
                            onPress: async () => {
                              await firebase
                                .firestore()
                                .collection("voziky")
                                .doc(id)
                                .collection("comments")
                                .doc(e.id)
                                .delete();
                              await fetchComments();
                            },
                          },
                        ]);
                      }}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
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
                Žádné poznámky
              </Text>
            </View>
          )}
        </Card>
      </View>
    </View>
  );
}
