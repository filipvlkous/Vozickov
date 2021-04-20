import React from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Card from "../../../Shared/Card";
import { Colors } from "../../../Styles/Global";

export default function DefaultVozik({ vozik }) {
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../../assets/images/back.png")}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{
                uri: vozik.downloadURL,
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={{ marginTop: 20, marginLeft: 40, marginBottom: 10 }}>
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  fontSize: 35,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                {vozik.name}
              </Text>
            </View>

            <View style={{ marginHorizontal: 45, marginBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "RobotoBold",
                    fontSize: 20,
                    textDecorationLine: "underline",
                  }}
                >
                  Rezervováno:{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "RobotoBold",
                    fontSize: 20,
                  }}
                >
                  {vozik.creation}
                </Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 35 }}>
              <Card>
                <View style={{ paddingVertical: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Šířka:
                      </Text>
                      <Text
                        style={{ fontFamily: "RobotoRegular", fontSize: 17 }}
                      >
                        {vozik.šířka} cm
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Hloubka:
                      </Text>
                      <Text
                        style={{ fontFamily: "RobotoRegular", fontSize: 17 }}
                      >
                        {vozik.hloubka} cm
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Výška:
                      </Text>
                      <Text
                        style={{ fontFamily: "RobotoRegular", fontSize: 17 }}
                      >
                        {vozik.výška} cm
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  ></View>
                </View>
              </Card>
            </View>

            <View style={{ marginHorizontal: 35 }}>
              <Card>
                <View style={{ padding: 15, paddingLeft: 30 }}>
                  <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                    Fyzioterapeut:
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                      {vozik.fyzioFirstName} {vozik.fyzioLastName}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                    Pacient:
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                      {vozik.firstName} {vozik.lastName}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "90%",
    height: 300,
    borderRadius: 30,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  imgContainer: {
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 4,
    backgroundColor: Colors.primeColor,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30,
    // borderBottomRightRadius: 30,
    // borderBottomLeftRadius: 30,
    //marginVertical: 6,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  textContainer: {},
});
