import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";

export default function AddVozik({ navigation }) {
  const [cameraHasPermission, setCameraHasPermission] = useState(null);
  const [galleryHasPermission, setGalleryHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraHasPermission(cameraStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryHasPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.3,
        aspect: [1, 1],
      });
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (cameraHasPermission === null || galleryHasPermission === null) {
    return <View />;
  }
  if (cameraHasPermission === false || galleryHasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (image) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={{ uri: image }} style={{ flex: 1 }}>
          <View style={styles.buttonContainer1}>
            <BlurView intensity={80} style={styles.buttonContainer2}>
              <View style={styles.buttonContainer3}>
                <View style={styles.buttonContainer4}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingBottom: 10,

                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => setImage(null)}>
                      <View>
                        <MaterialCommunityIcons
                          name={"camera-retake"}
                          size={40}
                          color="white"
                        />
                        <Text style={{ color: "white" }}>Znovu</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SaveVozik", { image })
                      }
                    >
                      <View>
                        <MaterialCommunityIcons
                          name={"image-plus"}
                          size={40}
                          color="white"
                        />
                        <Text style={{ color: "white" }}>Přidat</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.fixedRation}
          type={type}
          ref={(ref) => setCamera(ref)}
        >
          <View style={styles.buttonContainer1}>
            <BlurView intensity={90} style={styles.buttonContainer2}>
              <View style={styles.buttonContainer3}>
                <View style={styles.buttonContainer4}>
                  <TouchableOpacity onPress={() => pickImage()}>
                    <MaterialCommunityIcons
                      name={"image"}
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
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
                    <MaterialCommunityIcons
                      name={"camera-party-mode"}
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>
        </Camera>
      </View>
    </View>

    // {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },

  buttonContainer1: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
  },

  buttonContainer2: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },

  buttonContainer3: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },

  buttonContainer4: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    paddingVertical: 20,
    justifyContent: "space-evenly",
  },

  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },

  fixedRation: {
    flex: 1,
    height: "100%",
    //aspectRatio: 1,
  },
});

{
  /* <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialCommunityIcons name={"camera-party-mode"} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => takePicture()}>
              <MaterialCommunityIcons
                color={Colors.secondColor}
                size={80}
                name={"circle-slice-8"}
              />
            </TouchableOpacity>
            <Button title="Gallery Pictures" onPress={() => pickImage()} />
            <Button
              title="Save"
              onPress={() => navigation.navigate("Save", { image })}
            />
          </View> */
}
