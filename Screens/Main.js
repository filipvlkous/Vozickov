import React, { Component } from "react";
require("firebase/auth");
import { fetchUser, clearData, fetchVoziky } from "../Redux/Action";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import feedScreen from "./main/Feed";
import searchScreen from "./main/Search";
import profileScreen from "./main/Profile";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchVoziky();
    this.props.fetchUser();
  }

  render() {
    return (
      <Tab.Navigator
        barStyle={{ backgroundColor: "white" }}
        initialRouteName="Feed"
      >
        <Tab.Screen
          name="Feed"
          component={feedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            title: this.props.route.routeName,
          }}
        />
        <Tab.Screen
          name="Search"
          component={searchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
            title: this.props.route.routeName,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={profileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                color={color}
                size={26}
              />
            ),
            title: this.props.route.routeName,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();

              navigation.navigate("Profile", {
                uid: this.props.currentUser.uid,
              });
            },
          })}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  allVoziky: store.userState.allVoziky,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData, fetchVoziky }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
