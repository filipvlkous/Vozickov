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
import { fetchVoziky, fetchUserVoziky } from "../../Redux/Action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

function Feed(props) {
  const { allVoziky, navigation } = props;
  const [voziky, setVoziky] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [columns] = useState(["Sirka", "Delka", "Hloubka", "Rezervace"]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await props.fetchVoziky();
    await props.fetchUserVoziky();
    await setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  useEffect(() => {
    let isRendered = true;
    setVoziky(allVoziky);
    console.log(allVoziky);
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
          keyExtractor={(item, index) => item.id}
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
                  <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontFamily: "RobotoBold" }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text>{item.sirka}</Text>
                    <Text>{item.delka}</Text>
                    <Text>{item.hloubka}</Text>
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
    justifyContent: "center",
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
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
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky, fetchUserVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Feed);
