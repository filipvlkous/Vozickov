import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import Card from "../../Shared/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Search(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.allVoziky);
  }, []);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = _.filter(props.allVoziky, (vozik) => {
      if (vozik.name.toLowerCase().includes(formattedQuery)) {
        return true;
      }
      return false;
    });
    setData(filteredData);
  };

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../assets/images/back.png")}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss}
        accessible={false}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.tableHeader}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Název vozíku..."
                onChangeText={(search) => handleSearch(search)}
              />
              <TouchableOpacity onPress={Keyboard.dismiss}>
                <MaterialCommunityIcons name="magnify" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Vozik", { id: item.id })
                }
              >
                <Card>
                  <View
                    style={{
                      ...styles.itemContainer,
                      backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 25,
                        paddingBottom: 5,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",

                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            fontFamily: "RobotoBold",
                            paddingRight: 10,
                          }}
                        >
                          {item.číslo}.
                        </Text>
                        <Text
                          style={{ fontSize: 20, fontFamily: "RobotoBold" }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      {item.rezervace === null ? (
                        <MaterialCommunityIcons
                          name="human-wheelchair"
                          size={30}
                          color="green"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="wheelchair-accessibility"
                          size={30}
                          color="red"
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "700", paddingRight: 5 }}>
                          Šířka:
                        </Text>
                        <Text>{item.šířka} cm</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "700", paddingRight: 5 }}>
                          Výška:
                        </Text>
                        <Text>{item.výška} cm</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "700", paddingRight: 5 }}>
                          Hloubka:
                        </Text>
                        <Text>{item.hloubka} cm</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: 110,
    paddingHorizontal: 15,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#584ed4",
    padding: 10,
    fontSize: 18,
    borderRadius: 9,
    width: "80%",
    marginRight: 10,
  },
  itemContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: 110,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "black",
    fontFamily: "RobotoBold",
    fontSize: 17,
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
});

const mapStateToProps = (store) => ({
  allVoziky: store.userState.allVoziky,
});

export default connect(mapStateToProps, null)(Search);
