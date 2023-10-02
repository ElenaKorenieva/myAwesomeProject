import "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { useFonts } from "expo-font";

import { store } from "./redux/store";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Main from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {}, []);

  // onAuthStateChanged(auth, (user) => {
  //   setUser(user);
  // });
  // onAuthStateChanged((user) => setUser(user));

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
