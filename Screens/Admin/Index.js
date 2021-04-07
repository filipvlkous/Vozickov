import React, { useEffect } from "react";
import AdminUser from "./AdminUser/AdminUser";
import AdminVoziky from "./AdminVozik/AdminVoziky";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { fetchVoziky, fetchAllUsers } from "../../Redux/Action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => null;

function index(props) {
  useEffect(() => {
    let isRendered = true;
    props.fetchAllUsers();
    props.fetchVoziky();
    return () => {
      isRendered = false;
    };
  }, []);

  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Uživatelé"
        component={AdminUser}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Přidat vozík"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();

            navigation.navigate("AddVozik");
          },
        })}
      />
      <Tab.Screen
        name="Vozíky"
        component={AdminVoziky}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wheelchair" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const mapStateToProps = (store) => ({
  allVoziky: store.adminState.allVoziky,
  allUsers: store.adminState.allUsers,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky, fetchAllUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(index);
