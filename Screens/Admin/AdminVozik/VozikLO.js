import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Card from "../../../Shared/Card";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function VozikLO({ id }) {
  const [lo, setLo] = useState([]);

  const fetchLoData = async () => {
    await firebase
      .firestore()
      .collection("voziky")
      .doc(id)
      .collection("luzkoveOdd")
      .orderBy("creation", "desc")
      .get()
      .then((snap) => setLo(snap.docs.map((e) => e.data())));

    console.log("fetchComments VozikLO");
  };

  useEffect(() => {
    fetchLoData();
    lo.sort((a, b) => a.creation - b.creation);
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
          Lůžkové oddělení:
        </Text>
      </View>
      <Card>
        <View
          style={{
            padding: 15,
            paddingHorizontal: 30,
          }}
        >
          {lo.map((e, i, arr) => (
            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    paddingRight: 5,
                    fontFamily: "RobotoBold",
                    fontSize: 17,
                  }}
                >
                  {i + 1}.
                </Text>
                <Text
                  style={{
                    paddingRight: 5,
                    fontFamily: "RobotoBold",
                    fontSize: 17,
                  }}
                >
                  {e.LO}
                </Text>
                <Text
                  style={{
                    paddingRight: 5,
                    fontFamily: "RobotoBold",
                    fontSize: 17,
                  }}
                >
                  {e.creation}
                </Text>
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
      </Card>
    </View>
  );
}
