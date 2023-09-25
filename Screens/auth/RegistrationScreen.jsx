import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", () => {
      setShift(true);
    });
    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setShift(false);
    });

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, []);
  useEffect(() => {
    Animated.timing(position, {
      toValue: shift ? 90 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container} onPress={keyboardHide}>
        <StatusBar style="auto" />
        <ImageBackground
          source={require("../../assets/images/bgImage.png")}
          style={styles.bg}
          resizeMode="cover"
        />
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
        >
          <Animated.View
            style={[styles.formWrapper, { paddingBottom: position }]}
          >
            <TouchableOpacity activeOpacity={0.8} style={styles.plusBtn}>
              <Image
                source={require("../../assets/images/add.png")}
                style={styles.addIcon}
              />
            </TouchableOpacity>
            <View style={styles.avatar} />
            <View style={{ height: 60 }} />
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputsContainer}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логін"
                onFocus={() => setIsFocusedLogin(true)}
                onBlur={() => setIsFocusedLogin(false)}
                value={state.name}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, name: value }))
                }
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, email: value }))
                }
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Пароль"
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                secureTextEntry={true}
                value={state.password}
                onChangeText={(value) =>
                  setState((prev) => ({
                    ...prev,
                    password: value,
                  }))
                }
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={keyboardHide}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                Зареєструватися
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.btnAcount}>
                Вже є акаунт?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Увійти</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    top: 0,
    position: "absolute",
    height: screenSize.height,
    width: screenSize.width,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30 },
  inputsContainer: { gap: 10, width: "100%", padding: 10, marginBottom: 30 },
  input: {
    padding: 10,
    borderColor: "#E8E8E8",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: "flex-end",
  },
  formWrapper: {
    marginTop: 190,
    paddingTop: 45,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    height: 51,
    width: "90%",
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  btnAcount: {
    marginBottom: 78,
    marginRight: 10,
    color: "#1B4371",
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
  avatar: {
    top: -50,
    width: 120,
    height: 120,
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  plusBtn: {
    position: "absolute",
    top: 30,
    left: 253,
    zIndex: 9999,
  },
  addIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
