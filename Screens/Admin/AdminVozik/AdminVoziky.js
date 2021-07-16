import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  RefreshControl,
} from "react-native";
import { fetchVoziky, clearData } from "../../../Redux/Action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onDelete } from "./handleDeleteFunciton";
import { SwipeListView } from "react-native-swipe-list-view";
import { Colors } from "../../../Styles/Global";

function AdminVoziky(props) {
  const [voziky, setVoziky] = useState([]);
  const allVoziky = props.allVoziky;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await props.fetchVoziky();
    await setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  useEffect(() => {
    let isRendered = true;
    setVoziky(allVoziky);
    return () => {
      isRendered = false;
    };
  }, [allVoziky]);

  const handleDelete = (item) => {
    Alert.alert("Smazat", "Chcete vozík odstranit?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          await onDelete(item);
          await props.fetchVoziky();
        },
      },
    ]);
  };
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../../assets/images/back.png")}
    >
      <View style={{ flex: 1 }}>
        <SwipeListView
          data={voziky}
          refreshControl={
            <RefreshControl
              progressBackgroundColor="blue"
              tintColor="blue"
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  props.navigation.navigate("EditVozik", { id: item.id });
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardChiled}>
                    <Image
                      style={{
                        borderColor: Colors.primeColor,
                        borderWidth: 5,
                        width: 150,
                        height: 100,
                        borderRadius: 9,
                      }}
                      source={{ uri: item.downloadURL }}
                    />
                    <View style={{ maxWidth: 150 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.title}>{item.číslo}. </Text>
                        <Text style={styles.title}>{item.name}</Text>
                      </View>
                      {item.rezervace ? (
                        <View style={{ paddingLeft: 40, top: 5 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text>{item.fyzioFirstName}</Text>
                            <Text style={{ paddingLeft: 4 }}>
                              {item.fyzioLastName}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
                padding: 16,
              }}
            >
              <View style={{ alignItems: "flex-end", paddingRight: 5 }}>
                <TouchableOpacity
                  style={styles.touchableContainer}
                  onPress={() =>
                    handleDelete({ id: item.id, url: item.downloadURL })
                  }
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Vymazat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          rightOpenValue={-125}
          disableRightSwipe
        />
      </View>
    </ImageBackground>
  );
}

const mapStateToProps = (store) => ({
  allVoziky: store.adminState.allVoziky,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ clearData, fetchVoziky }, dispatch);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },

  cardContainer: {
    marginVertical: 5,
  },

  touchableContainer: {
    backgroundColor: "red",
    width: 100,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: "#999",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
  },

  cardChiled: {
    flex: 1,
    padding: 2,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 30,
  },

  title: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    paddingLeft: 10,

    textTransform: "uppercase",
  },

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
  card: {
    borderRadius: 9,
    elevation: 3,
    backgroundColor: "#eeeeee",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 2,
  },
});

export default connect(mapStateToProps, mapDispatchProps)(AdminVoziky);
