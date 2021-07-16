import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Card from "../../Shared/Card";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchVoziky } from "../../Redux/Action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

function Feed(props) {
  const { allVoziky, navigation } = props;
  const [voziky, setVoziky] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [columns] = useState([
    "Číslo",
    "Šířka",
    "Výška",
    "Hloubka",
    "Rezervace",
  ]);
  const [direction, setDirection] = useState("asc");
  const [selectedColumn, setSelectedColumn] = useState("Číslo");

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

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    const sortedData = _.orderBy(
      allVoziky,
      [column.toLowerCase()],
      [newDirection]
    );
    setSelectedColumn(column);
    setDirection(newDirection);
    setVoziky(sortedData);
  };

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("../../assets/images/back.png")}
    >
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          {columns.map((column, index) => {
            {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.columnHeader}
                  onPress={() => sortTable(column)}
                >
                  <Text style={styles.columnHeaderTxt}>
                    {column + " "}
                    {selectedColumn === column && (
                      <AntDesign
                        size={20}
                        name={direction === "desc" ? "arrowdown" : "arrowup"}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              progressBackgroundColor="blue"
              tintColor="blue"
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          data={voziky}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Vozik", { id: item.id })}
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
                      <Text style={{ fontSize: 20, fontFamily: "RobotoBold" }}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  tableHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
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
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Feed);
