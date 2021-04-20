import React from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ButtonOutline } from "../../../Shared/Button";
import Card from "../../../Shared/Card";
import { Colors } from "../../../Styles/Global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Reserved({ onRemove, vozik }) {
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
              transition={false}
            />
          </View>

          <View style={styles.textContainer}>
            <View
              style={{
                marginTop: 20,
                marginLeft: 40,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  fontSize: 35,
                  //textDecorationLine: "underline",
                }}
              >
                {vozik.name}
              </Text>
            </View>

            <View style={{ marginHorizontal: 45 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "RobotoBold",
                    fontSize: 20,
                    //textDecorationLine: "underline",
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

            <View style={styles.button}>
              <ButtonOutline title="uvolnit" onPress={() => onRemove()} />
            </View>

            <View style={{ marginHorizontal: 40 }}>
              <Card>
                <View style={{ paddingVertical: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View style={styles.numberContainer}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Šířka:
                      </Text>
                      <Text
                        style={{ fontFamily: "RobotoRegular", fontSize: 18 }}
                      >
                        {vozik.šířka} cm
                      </Text>
                    </View>

                    <View style={styles.numberContainer}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Hloubka:
                      </Text>
                      <Text
                        style={{ fontFamily: "RobotoRegular", fontSize: 18 }}
                      >
                        {vozik.hloubka} cm
                      </Text>
                    </View>

                    <View style={styles.numberContainer}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Výška:
                      </Text>
                      <Text
                        style={{ fontFamily: "RobotoRegular", fontSize: 18 }}
                      >
                        {vozik.výška} cm
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            </View>

            <View style={{ marginHorizontal: 40 }}>
              <Card>
                <View style={{ margin: 15, paddingLeft: 30 }}>
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

<MaterialCommunityIcons
  name="account-box"
  size={26}
  color={Colors.secondColor}
/>;
const styles = StyleSheet.create({
  numberContainer: {
    //flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "red",
  },

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
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30,
    backgroundColor: Colors.primeColor,
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
});
