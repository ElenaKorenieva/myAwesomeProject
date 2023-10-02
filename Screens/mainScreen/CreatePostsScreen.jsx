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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import getFilename from "../../utils/getFilename";
import fetchLocalPhoto from "../../utils/fetchLocalPhoto";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  title: "Photo1",
  location: {
    latitude: 0,
    longitude: 0,
  },
  authorId: "",
  place: "Amsterdam",
  imgURL: "",
};

const CreateScreen = () => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState(null);
  // const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  console.log("userId", userId);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    // console.log("location", location.coords.latitude);
    // console.log("location", location.coords.longitude);
    // setState((prev) => ({
    //   ...prev,
    //   place: `latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude}`,

    // }));
    setState((prev) => ({
      ...prev,
      imgURL: photo.uri,
    }));
  };

  const btnImage = state.imgURL
    ? require("../../assets/images/Group.png")
    : require("../../assets/images/Group2.png");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      } else {
        const location = await Location.getCurrentPositionAsync();

        setState((prev) => ({
          ...prev,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        }));
      }
    })();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      navigation.goBack();
    }
  }, [isSuccess]);

  const resetForm = (e) => {
    setState(initialState);
  };

  const uploadPhotoToServer = async () => {
    setIsLoading(true);
    const storageName = "postImages";
    console.log("Upload photo");

    const file = await fetchLocalPhoto(state.imgURL);
    const filename = getFilename(state.imgURL);

    console.log("file", file);
    console.log("filename", filename);
    const imageRef = ref(storage, `${storageName}/${filename}`);
    console.log("imageRef", imageRef);

    const uploadTask = await uploadBytesResumable(imageRef, file);

    if (uploadTask.state === "success") {
      const imageURL = await getDownloadURL(imageRef);
      const newPost = {
        ...state,
        authorID: userId,
        imageURL,
      };
      await addDoc(collection(db, "posts"), newPost);
      setIsSuccess(true);
      setIsLoading(false);
      return { data: true };
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      return { error: { data: "post saving failed", status: 400 } };
    }
  };

  const getPhotoFromServer = async () => {
    const photoFromServer = await getDocs(collection(db, "posts"));
    console.log("photoFromServer", photoFromServer);
    const postsList = [];

    try {
      photoFromServer.map((photo) => {
        postsList.push({ postId: photo.id, post: photo.data() });
        console.log("postsList", postsList);
      });
      return { data: postsList };
    } catch (error) {
      return { error: { data: "post getting failed", status: 400 } };
    }
  };

  console.log("state", state);
  getPhotoFromServer();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      bounces={false}
    >
      <View style={styles.container}>
        <View style={styles.takePhotoContainer}>
          {state.imgURL ? (
            <Image
              source={{ uri: state.imgURL }}
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
          {!state.imgURL ? (
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
            value={state.title}
            onChangeText={(value) =>
              setState((prev) => ({
                ...prev,
                title: value,
              }))
            }
            // editable={Boolean(state.imgURL)}
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
            value={state.place}
            onChangeText={(value) =>
              setState((prev) => ({
                ...prev,
                place: value,
              }))
            }
            // editable={Boolean(state.imgURL)}
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
              onPress={(uploadPhotoToServer, getPhotoFromServer)}
              style={
                !!state.imgURL
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
              disabled={!Boolean(state.imgURL)}
            >
              <Text
                style={
                  !!state.imgURL
                    ? styles.snapLabel
                    : {
                        textAlign: "center",
                        fontSize: 16,
                        color: "#BDBDBD",
                      }
                }
              >
                {isLoading ? "Йде завантаження" : "Опублікувати"}
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
