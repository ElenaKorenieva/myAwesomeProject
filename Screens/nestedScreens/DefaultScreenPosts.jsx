import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <TouchableOpacity style={styles.avatarWrapper}>
          <Image
            source={require("../../assets/images/AvatarImg.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.userName}>userName</Text>
          <Text style={styles.userEmail}>userEmail</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{ width: 350, height: 200 }}
              />
            </TouchableOpacity>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                <Ionicons
                  name={"logo-twitch"}
                  size={24}
                  color="#BDBDBD"
                  style={styles.map_svg}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                <Ionicons
                  name={"location-outline"}
                  size={24}
                  color="#BDBDBD"
                  style={styles.map_svg}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  userWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: "cover",
  },
  userName: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "RobotoBold",
  },
  userEmail: {
    color: "#212121",
    fontSize: 11,
    fontFamily: "Roboto",
  },
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});

export default DefaultScreenPosts;
