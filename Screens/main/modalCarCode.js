import React from "react";
import { View, Image, Modal, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ModalCarCode({ modalVisible, setModalVisible }) {
  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
      <View
        style={{
          position: "absolute",
          zIndex: 99,
          width: "100%",
          height: Dimensions.get("screen").height,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000aa",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 9,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              paddingHorizontal: 50,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <View style={{ left: "40%", paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={35} color={"#656565"} />
              </TouchableOpacity>
            </View>

            <Image source={require("../../assets/images/carKod.jpeg")} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
