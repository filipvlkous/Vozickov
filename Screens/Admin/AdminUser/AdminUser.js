import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { fetchAllUsers } from "../../../Redux/Action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Card from "../../../Shared/Card";
import { SwipeListView } from "react-native-swipe-list-view";
import { onDelete } from "./handleDeleteFunciton";

function AdminUser(props) {
  const [users, setUsers] = useState([]);
  const allUsers = props.allUsers;

  useEffect(() => {
    let isRendered = true;
    setUsers(allUsers);
    return () => {
      isRendered = false;
    };
  }, [allUsers]);

  const handleDelete = (item) => {
    Alert.alert("Smazat", "Chcete uživatele odstranit?", [
      { text: "Ne" },
      {
        text: "Ano",
        onPress: async () => {
          console.log("smazano");
          await onDelete(item);
          await props.fetchAllUsers();
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
          data={users}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Card>
                <View style={styles.cardChiled}>
                  <Text style={styles.title}>{item.email}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.title}>{item.firstName} </Text>
                    <Text style={styles.title}>{item.lastName}</Text>
                  </View>
                </View>
              </Card>
            </View>
          )}
          renderHiddenItem={({ item, rowMap }) => (
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
                  onPress={() => handleDelete(item.id)}
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
  allUsers: store.adminState.allUsers,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchAllUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AdminUser);

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
    height: 50,
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
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#666",
  },
});
