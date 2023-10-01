import { Ionicons, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

export function screenOptions({ route, navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return {
    headerRight: () => {
      return (
        <Feather
          name="log-out"
          size={24}
          color="#BDBDBD"
          style={{ marginRight: 21 }}
          onPress={signOut}
        />
      );
    },
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === "Posts") {
        iconName = "grid-outline";
      } else if (route.name === "Create") {
        iconName = "ios-add-sharp";
      } else if (route.name === "Profile") {
        iconName = "person-outline";
      }
      return (
        <Ionicons
          name={iconName}
          size={size}
          color={route.name === "Create" ? "#ffffff" : color}
          style={route.name === "Create" ? styles.menu_icon_active : ""}
        />
      );
    },
    tabBarActiveTintColor: "#ff6c00",
    tabBarInactiveTintColor: "#212121",
    tabBarShowLabel: false,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu_icon_active: {
    backgroundColor: "#ff6c00",
    width: 90,
    height: 40,
    textAlign: "center",
    marginTop: 8,
    paddingTop: 5,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
  },
});
