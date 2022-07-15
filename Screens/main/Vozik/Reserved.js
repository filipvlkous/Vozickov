import React, { useState } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ButtonOutline } from "../../../Shared/Button";
import Card from "../../../Shared/Card";
import { Colors } from "../../../Styles/Global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Comments from "../Comments";
import ModalComment from "../ModalComment";
import { AntDesign } from "@expo/vector-icons";
import ModalCarCode from "../modalCarCode";

export default function Reserved({
  onRemove,
  vozik,
  comments,
  fetchComments,
  id,
}) {
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
            <View style={{ marginHorizontal: 45, paddingBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
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
                <View
                  style={{
                    margin: 15,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                    Fyzioterapeut:
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: "RobotoRegular", fontSize: 17 }}>
                      {vozik.fyzioFirstName} {vozik.fyzioLastName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
                        Pacient:
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{ fontFamily: "RobotoRegular", fontSize: 17 }}
                        >
                          {vozik.firstName} {vozik.lastName}
                          {"    "} {vozik.lo}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
              <Comments
                comments={comments}
                id={id}
                fetchComments={fetchComments}
                setModalVisible={() => setModalCommVisible(true)}
              />
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
    alignItems: "center",
  },

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
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30,
    backgroundColor: Colors.primeColor,
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
