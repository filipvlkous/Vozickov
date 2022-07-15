import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVoziky } from "../../../Redux/Action/index";
import Card from "../../../Shared/Card";
import { Colors } from "../../../Styles/Global";
import VozikLO from "./VozikLO";
import Revize from "./Revize";
function EditVozik(props) {
  const { id } = props.route.params;
  const [vozik, setVozik] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hloubka, setHloubka] = useState(null);
  const [sirka, setSirka] = useState(null);
  const [vyska, setVyska] = useState(null);
  const [revize, setRevize] = useState([]);

  const fetchVozik = async () => {
    const vuz = await props.allVoziky.find((obj) => obj.id === id);
    setVozik(vuz);
    setIsLoading(false);
    console.log("fetchVozik EditVozik");
  };

  useEffect(() => {
    fetchVozik();
  }),
    [id];

  const handleVyska = () => {
    let vys;
    vyska === null ? (vys = vozik.výška) : (vys = vyska);

    Alert.alert("Upravit hodnotu", "Přejete upravit hodnoty?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          await firebase
            .firestore()
            .collection("voziky")
            .doc(id)
            .update({ výška: vys });
        },
      },
    ]);
  };

  const handleSirka = () => {
    let sir;
    sirka === null ? (sir = vozik.šířka) : (sir = sirka);

    Alert.alert("Upravit hodnotu", "Přejete upravit hodnoty?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          firebase
            .firestore()
            .collection("voziky")
            .doc(id)
            .update({ šířka: sir });
        },
      },
    ]);
  };

  const handleRezervace = () => {
    Alert.alert("Uvolnit", "Přejete uvolnit vozík?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          await firebase
            .firestore()
            .collection("voziky")
            .doc(id)
            .update({ rezervace: null });
          await props.fetchVoziky();
          await props.navigation.goBack();
        },
      },
    ]);
  };

  const handleHloubka = () => {
    let hlou;
    hloubka === null ? (hlou = vozik.hloubka) : (hlou = hloubka);

    Alert.alert("Upravit hodnotu", "Přejete upravit hodnoty?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          firebase
            .firestore()
            .collection("voziky")
            .doc(id)
            .update({ hloubka: hlou });
        },
      },
    ]);
  };

  if (isLoading === true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../../assets/images/back.png")}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={130}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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

            <View style={{ marginHorizontal: 35 }}>
              {vozik.rezervace ? (
                <Card>
                  <View style={{ paddingVertical: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingLeft: 30,
                        paddingBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>Fyzio: </Text>
                      <Text>{vozik.fyzioFirstName}</Text>
                      <Text style={{ paddingLeft: 4 }}>
                        {vozik.fyzioLastName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", paddingLeft: 30 }}>
                      <Text style={{ fontWeight: "bold" }}>Pacient: </Text>
                      <Text>{vozik.firstName}</Text>
                      <Text style={{ paddingLeft: 4 }}>{vozik.lastName}</Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                      <TouchableOpacity
                        onPress={handleRezervace}
                        style={{
                          ...styles.ButtonContainer,
                          backgroundColor: "red",
                        }}
                      >
                        <Text style={styles.ButtonText}>Uvolnit Vozik</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              ) : null}

              <VozikLO id={id} />
              <Revize id={id} revize={revize} />
              <Card>
                <View style={{ paddingVertical: 20 }}>
                  <View
                    style={{
                      justifyContent: "space-evenly",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 3,
                          flexDirection: "row",
                          paddingHorizontal: 5,
                          borderRadius: 9,
                          borderColor: Colors.primeColor,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          style={{ fontSize: 20, fontFamily: "RobotoBold" }}
                          placeholder="Vyska"
                          defaultValue={String(vozik.výška)}
                          value={vyska}
                          onChangeText={(vyska) => {
                            setVyska(vyska);
                          }}
                        />
                        <View
                          style={{
                            justifyContent: "center",
                            paddingLeft: 5,
                          }}
                        >
                          <Text>Cm</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={handleVyska}
                        style={styles.ButtonContainer}
                      >
                        <Text style={styles.ButtonText}>Upravit Výšku</Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 60,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 3,
                          flexDirection: "row",
                          paddingHorizontal: 5,
                          borderRadius: 9,
                          borderColor: Colors.primeColor,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          style={{ fontSize: 20, fontFamily: "RobotoBold" }}
                          placeholder="Sirka"
                          defaultValue={String(vozik.šířka)}
                          value={sirka}
                          onChangeText={(input) => {
                            setSirka(input);
                          }}
                        />
                        <View
                          style={{
                            justifyContent: "center",
                            paddingLeft: 5,
                          }}
                        >
                          <Text>Cm</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={handleSirka}
                        style={styles.ButtonContainer}
                      >
                        <Text style={styles.ButtonText}>Upravit Šířku</Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 60,
                        paddingTop: 10,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 3,
                          flexDirection: "row",
                          paddingHorizontal: 5,
                          borderRadius: 9,
                          borderColor: Colors.primeColor,
                        }}
                      >
                        <TextInput
                          keyboardType="numeric"
                          style={{ fontSize: 20, fontFamily: "RobotoBold" }}
                          placeholder="Hloubka"
                          defaultValue={String(vozik.hloubka)}
                          value={hloubka}
                          onChangeText={(input) => {
                            setHloubka(input);
                          }}
                        />
                        <View
                          style={{
                            justifyContent: "center",
                            paddingLeft: 5,
                          }}
                        >
                          <Text>Cm</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={handleHloubka}
                        style={styles.ButtonContainer}
                      >
                        <Text style={styles.ButtonText}>Upravit Hloubka</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  ButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.primeColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    marginLeft: 10,
  },
  ButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
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
    shadowOpacity: 0.4,
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

const mapStateToProps = (store) => ({
  allVoziky: store.userState.allVoziky,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(EditVozik);
