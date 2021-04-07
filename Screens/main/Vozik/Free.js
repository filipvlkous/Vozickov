import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { ButtonOutline } from "../../../Shared/Button";
import ModalVozik from "../ModalVozik";
import Card from "../../../Shared/Card";
import { Colors } from "../../../Styles/Global";
export default function Free({ navigation, id, vozik }) {
  const [modalVisible, setModalVisible] = useState(false);
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
          <View style={{ marginTop: 20, marginLeft: 40, marginBottom: 10 }}>
            <Text
              style={{
                fontFamily: "RobotoBold",
                fontSize: 35,
                textDecorationLine: "underline",
              }}
            >
              {vozik.name}
            </Text>
          </View>
          <View style={styles.button}>
            <ButtonOutline
              title="Rezervovat"
              onPress={() => setModalVisible(true)}
            />
          </View>
          <ModalVozik
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(false)}
            navigation={navigation}
            id={id}
          />

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
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                      {vozik.sirka} cm
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                      Hloubka:
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                      {vozik.hloubka} cm
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                      Délka:
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                      {vozik.delka} cm
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
  },
  imgContainer: {
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    backgroundColor: Colors.primeColor,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30,
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
