import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchVoziky, clearData } from "../../Redux/Action/index";
import { bindActionCreators } from "redux";
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Card from "../../Shared/Card";
require("firebase/firestore");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

function Profile(props) {
  const { currentUser, allVoziky } = props;
  const [refreshing, setRefreshing] = useState(false);

  const userVozik = allVoziky.filter(
    (vuz) => vuz.rezervace === currentUser.uid
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await props.fetchVoziky();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../assets/images/back.png")}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.headerView}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "RobotoBold",
              textTransform: "uppercase",
            }}
          >
            {currentUser.data.firstName} {currentUser.data.lastName}
          </Text>
          <MaterialCommunityIcons
            name={"login-variant"}
            onPress={() => {
              Alert.alert("Odhlášení", "Chcete se odhlásit?", [
                { text: "Ne" },
                {
                  text: "Ano",
                  onPress: () => {
                    firebase.auth().signOut();
                  },
                },
              ]);
            }}
            size={35}
          />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              progressBackgroundColor="blue"
              tintColor="blue"
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          numColumns={1}
          horizontal={false}
          data={userVozik}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Vozik", { id: item.id })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 60,
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "RobotoBold", fontSize: 17 }}>
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: "RobotoRegular" }}>
                      {item.firstName}{" "}
                    </Text>
                    <Text style={{ fontFamily: "RobotoRegular" }}>
                      {item.lastName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: 110,
    paddingBottom: 20,
    paddingHorizontal: 40,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  allVoziky: store.userState.allVoziky,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);
