import React, { useEffect, useState } from "react";
import { Alert, View, Text, ImageBackground } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVoziky, fetchUserVoziky } from "../../Redux/Action/index";
import Reserved from "./Vozik/Reserved";
import Free from "./Vozik/Free";
import DefaultVozik from "./Vozik/DefaultVozik";

function Vozik(props) {
  const { id } = props.route.params;
  const [vozik, setVozik] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVozik = async () => {
    const vuz = await (
      await firebase.firestore().collection("voziky").doc(id).get()
    ).data();
    setVozik(vuz);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVozik();
    props.fetchVoziky();
  }, []);

  const onRemove = () => {
    Alert.alert("Uvolnit", "Přejete si vozík uvolnit?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          await firebase
            .firestore()
            .collection("voziky")
            .doc(id)
            .update({ rezervace: null })
            .then(props.fetchVoziky());
          props.navigation.popToTop();
        },
      },
    ]);
  };

  if (isLoading === true) {
    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/back2.png")}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  switch (vozik.rezervace) {
    case props.currentUser.uid:
      return (
        <Reserved
          navigation={props.navigation}
          vozik={vozik}
          onRemove={onRemove}
        />
      );
    case null:
      return <Free id={id} vozik={vozik} navigation={props.navigation} />;
    default:
      return <DefaultVozik vozik={vozik} />;
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  allVoziky: store.userState.allVoziky,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Vozik);
