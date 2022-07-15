import React, { useEffect, useState } from "react";
import { Alert, View, Text, ImageBackground } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVoziky } from "../../Redux/Action/index";
import Reserved from "./Vozik/Reserved";
import Free from "./Vozik/Free";
import DefaultVozik from "./Vozik/DefaultVozik";

function Vozik(props) {
  const { id } = props.route.params;
  const [vozik, setVozik] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);

  const fetchVozik = async () => {
    const vuz = await (
      await firebase.firestore().collection("voziky").doc(id).get()
    ).data();

    setVozik(vuz);
  };

  const fetchComments = async () => {
    await firebase
      .firestore()
      .collection("voziky")
      .doc(id)
      .collection("comments")
      .get()
      .then((snap) =>
        setComments(
          snap.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        )
      );
  };

  const fetchData = async () => {
    await fetchVozik();
    await fetchComments();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    props.fetchVoziky();
  }, [id]);

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
          fetchComments={fetchComments}
          comments={comments}
          id={id}
        />
      );
    case null:
      return (
        <Free
          id={id}
          vozik={vozik}
          comments={comments}
          navigation={props.navigation}
          fetchComments={fetchComments}
        />
      );
    default:
      return (
        <DefaultVozik
          vozik={vozik}
          fetchComments={fetchComments}
          comments={comments}
          id={id}
        />
      );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  allVoziky: store.userState.allVoziky,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Vozik);
