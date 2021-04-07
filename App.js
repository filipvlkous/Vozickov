import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { View, Text } from "react-native";
import VozikScreen from "./Screens/main/Vozik";
import Admin from "./Screens/Admin/Index";
import AddVozik from "./Screens/Admin/AdminVozik/AddVozik";
import SaveVozik from "./Screens/Admin/AdminVozik/SaveVozik";
import MainScreen from "./Screens/Main";
import * as firebase from "firebase";
import LandingScreen from "./Screens/Auth/Landing";
import RegisterScreen from "./Screens/Auth/Register";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Redux/Reducers/index";
import thunk from "redux-thunk";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import Logout from "./Shared/Logout";

var firebaseConfig = {
  apiKey: "AIzaSyDDOF2HjZiPYuwaXU90V40H91ZHs6kufCA",
  authDomain: "vozickovspinalka.firebaseapp.com",
  projectId: "vozickovspinalka",
  storageBucket: "vozickovspinalka.appspot.com",
  messagingSenderId: "150232287624",
  appId: "1:150232287624:web:988250e3397a7c331e523d",
  measurementId: "G-HHNFV6Y1R8",
};

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currentUser: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
      RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    }).then(this.setState({ font: true }));

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
          currentUser: false,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
          currentUser: user,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded, font, currentUser } = this.state;
    if (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StatusBar style="auto" />

          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn && font && !currentUser) {
      return (
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{ headerTintColor: "black" }}
            initialRouteName="Landing"
          >
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    if (currentUser.uid === "PF1ZvmlkngasgbQE59CtedbEpps1") {
      return (
        <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerTintColor: "black", title: false }}
              initialRouteName="MainAdmin"
            >
              <Stack.Screen
                name="MainAdmin"
                component={Admin}
                options={{ headerRight: () => <Logout /> }}
              />
              <Stack.Screen name="AddVozik" component={AddVozik} />
              <Stack.Screen name="SaveVozik" component={SaveVozik} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerTintColor: "black" }}
            initialRouteName="Main"
          >
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: false,
                //headerRight: () => <Header />,
              }}
              name="Vozik"
              component={VozikScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
