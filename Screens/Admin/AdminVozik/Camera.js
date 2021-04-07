import React from "react";
import { View, Text } from "react-native";

export default function Camera({ ref, type }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.fixedRation}
          type={type}
          ref={(ref) => setCamera(ref)}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              //backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => takePicture()}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: "#fff",
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <View>
                      <MaterialCommunityIcons
                        name={"camera-party-mode"}
                        size={40}
                        color="white"
                      />
                      <Text style={{ color: "white" }}>Otočit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Camera>
      </View>
    </View>
  );
}
