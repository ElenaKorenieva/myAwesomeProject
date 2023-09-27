import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const initialState = {
  photoDescription: "",
  location: "",
  photo: "",
};

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("location", location.coords.latitude);
    console.log("location", location.coords.longitude);
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const btnImage = photo
    ? require("../../assets/images/Group.png")
    : require("../../assets/images/Group2.png");

  const sendPhoto = () => {
    console.log("navigation", navigation);
    navigation.navigate("DefaultScreen", { photo });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);

  const resetForm = (e) => {
    setState(initialState);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      bounces={false}
    >
      <View style={styles.container}>
        <View style={styles.takePhotoContainer}>
          {photo ? (
            // <Image
            //   source={{ uri: photo }}
            //   style={{
            //     width: 343,
            //     height: 200,
            //     borderRadius: 10,
            //   }}
            // />
            <View />
          ) : (
            <Camera style={styles.camera} ref={setCamera}>
              <Text>jskgfjhjhjg</Text>
            </Camera>
          )}
          <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
            <Image source={btnImage} style={styles.photo_icon} />
          </TouchableOpacity>
        </View>

        <View style={{ width: "82%" }}>
          {!photo ? (
            <Text style={styles.wrapTitle}>Завантажте фото</Text>
          ) : (
            <Text style={styles.wrapTitle}>Редагувати фото</Text>
          )}
        </View>

        <View style={{ width: "82%" }}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            value={state.photoDescription}
            onChangeText={(value) =>
              setState((prev) => ({
                ...prev,
                photoDescription: value,
              }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={state.location.latitude?.toString()}
            onChangeText={(value) =>
              setState((prev) => ({
                ...prev,
                location: value,
              }))
            }
          />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <View>
            <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
              <Text style={styles.snapLabel}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn_wrp}>
            <TouchableOpacity onPress={resetForm} style={styles.button_delete}>
              <Ionicons name={"md-trash-outline"} size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: "flex-end",
  },
  camera: {
    width: 300,
    height: 200,
    marginHorizontal: 2,
    borderRadius: 10,
    alignItems: "center",
    // justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    position: "absolute",
    top: 150,
    left: 50,
    zIndex: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 50,
    height: 50,
  },
  takePhotoContainer: {
    width: 343,
    height: 200,
    marginTop: 32,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "grey",
    position: "relative",
  },
  sendBtn: {
    height: 51,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  snapLabel: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  photo_icon: {
    width: 60,
    height: 60,
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  wrapTitle: {
    marginTop: 8,
    marginBottom: 32,
    color: "#BDBDBD",
    fontSize: 16,
  },
  input: {
    marginBottom: 16,
    height: 50,
    paddingVertical: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  btn_wrp: {
    alignItems: "center",
    position: "sticky",
  },
  button_delete: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 80,
    width: 70,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#efecec",
    margin: 0,
  },
});

export default CreateScreen;
