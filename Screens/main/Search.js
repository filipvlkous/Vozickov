import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { globalStyles } from "../../Styles/Global";
import { connect } from "react-redux";

function Search(props) {
  const [vysledky, setVysledky] = useState([]);
  const [width, setWidth] = useState("50%");

  const searchVozik = (text) => {
    const formatText = text.toLowerCase();
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
        <View style={{ flex: 1, marginTop: 50 }}>
          <TextInput
            textAlign={"center"}
            style={{
              ...globalStyles.input,
              width: width,
              alignContent: "center",
              alignItems: "center",
            }}
            placeholder="Type Here..."
            onChangeText={(search) => searchVozik(search)}
            onFocus={() => setWidth("70%")}
            onBlur={() => setWidth("50%")}
          />
          <FlatList
            numColumns={1}
            horizontal={false}
            data={vysledky}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Vozik", { id: item.id })
                }
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const mapStateToProps = (store) => ({
  allVoziky: store.userState.allVoziky,
});

export default connect(mapStateToProps, null)(Search);
