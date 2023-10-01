import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytesResumable } from "firebase/storage";
import getFilename from "../../utils/getFilename";
import fetchLocalPhoto from "../../utils/fetchLocalPhoto";

const initialState = {
  photoDescription: "",
  location: "",
};

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    // console.log("location", location.coords.latitude);
    // console.log("location", location.coords.longitude);
    setState((prev) => ({
      ...prev,
      location: `latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude}`,
    }));
    setPhoto(photo.uri);
    // console.log("photo", photo);
  };

  const btnImage = photo
    ? require("../../assets/images/Group.png")
    : require("../../assets/images/Group2.png");

  const sendPhoto = () => {
    // console.log("navigation", navigation);
    uploadPhotoToServer();
    navigation.navigate("Posts", { photo });
    setState(initialState);
    setPhoto(null);
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
    setPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    // const storageName = "postImages";

    // const file = await fetchLocalPhoto(photo);
    // const filename = getFilename(photo);
    // console.log("photo", photo);
    // console.log("file", file);
    // console.log("filename", filename);
    // const imageRef = ref(storage, `${storageName}/${filename}`);
    // console.log("ïmageRef", imageRef);

    // const uploadTask = await uploadBytesResumable(imageRef, file);

    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const docRef = ref(storage, `postImage/${uniquePostId}`);

    const uploadTask = await uploadBytesResumable(docRef, file);

    // const data = await db.ref(`postImage/${uniquePostId}`).put(file);
    // console.log("data", data);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      bounces={false}
    >
      <View style={styles.container}>
        <View style={styles.takePhotoContainer}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{
                width: 343,
                height: 200,
                borderRadius: 10,
              }}
            />
          ) : (
            <Camera style={styles.camera} ref={setCamera}></Camera>
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

        <View style={{ width: "90%" }}>
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
            editable={photo ? true : false}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Ionicons
            name={"location-outline"}
            size={24}
            color="#BDBDBD"
            style={styles.map_svg}
          />
          <TextInput
            style={styles.input_map}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={state.location}
            onChangeText={(value) =>
              setState((prev) => ({
                ...prev,
                location: value,
              }))
            }
            editable={photo ? true : false}
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
            <TouchableOpacity
              onPress={sendPhoto}
              style={
                photo
                  ? styles.sendBtn
                  : {
                      marginTop: 43,
                      backgroundColor: "#e4e1e1",
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderRadius: 100,
                      cursor: "pointer",
                    }
              }
              disabled={photo ? false : true}
            >
              <Text
                style={
                  photo
                    ? styles.snapLabel
                    : {
                        textAlign: "center",
                        fontSize: 16,
                        color: "#BDBDBD",
                      }
                }
              >
                Опублікувати
              </Text>
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
    paddingHorizontal: 16,
  },
  scrollViewContainer: {
    minHeight: screenSize.height,
  },
  camera: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    color: "transparent",
  },
  snapContainer: {
    position: "absolute",
    width: 60,
    height: 60,
  },
  takePhotoContainer: {
    height: 300,
    width: "100%",
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
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
  input_map: {
    marginBottom: 16,
    paddingLeft: 25,
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
    width: 70,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#efecec",
    margin: 0,
  },
  map_svg: {
    position: "absolute",
    bottom: 28,
  },
});

export default CreateScreen;
