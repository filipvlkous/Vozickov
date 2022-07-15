import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ButtonOutline } from "../../../Shared/Button";
import ModalVozik from "../ModalVozik";
import Card from "../../../Shared/Card";
import { Colors } from "../../../Styles/Global";
import Comments from "../Comments";
import ModalComment from "../ModalComment";
import ModalCarCode from "../modalCarCode";
import { AntDesign } from "@expo/vector-icons";

export default function Free({
  fetchComments,
  navigation,
  id,
  vozik,
  comments,
}) {
  const [modalVozikVisible, setModalVozikVisible] = useState(false);
  const [modalCommVisible, setModalCommVisible] = useState(false);
  const [modalQRVisible, setModalQRVisible] = useState(false);
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
          <View style={{ marginHorizontal: 45, paddingBottom: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  fontSize: 20,
                  //textDecorationLine: "underline",
                }}
              >
                Revize:{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  fontSize: 20,
                }}
              >
                {vozik.revize}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                backgroundColor: "#fff",
                position: "absolute",
                left: "80%",
              }}
            >
              <TouchableOpacity onPress={() => setModalQRVisible(true)}>
                <AntDesign name="qrcode" size={54} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...styles.button, paddingTop: 30 }}>
            <ButtonOutline
              title="Rezervovat"
              onPress={() => setModalVozikVisible(true)}
            />
          </View>
          <ModalVozik
            modalVisible={modalVozikVisible}
            setModalVisible={() => setModalVozikVisible(false)}
            navigation={navigation}
            id={id}
          />
          <ModalComment
            modalVisible={modalCommVisible}
            setModalVisible={() => setModalCommVisible(false)}
            id={id}
            fetchComments={fetchComments}
          />
          <ModalCarCode
            modalVisible={modalQRVisible}
            setModalVisible={() => setModalQRVisible(false)}
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
                      {vozik.šířka} cm
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
                      Výška:
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
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
            <Comments
              comments={comments}
              id={id}
              fetchComments={fetchComments}
              setModalVisible={() => setModalCommVisible(true)}
            />
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
