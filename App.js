import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RegistrationScreen from "./Screens/RegistrationScreen.jsx";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      {/* <LoginScreen /> */}
      <RegistrationScreen />
    </>
  );
}
