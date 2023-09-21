// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   ImageBackground,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// import Input from "../shared/components/Input.jsx";

// export default LoginScreen = () => {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [isKeyboard, isKeyboardOpen] = useState(false);

//   const onLogin = () => {
//     Alert.alert("Credentials", `${email} + ${password}`);
//   };

//   const nameHandler = (text) => setName(text);
//   const passwordHandler = (text) => setPassword(text);
//   const emailHandler = (text) => setPassword(text);
//   return (
//     <>
//       <View style={styles.container}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ImageBackground
//             source={require("../assets/images/bgImage.png")}
//             resizeMode="cover"
//             style={styles.bgImage}
//           >
//             <KeyboardAvoidingView
//               behavior={Platform.OS == "ios" ? "padding" : "height"}
//               style={{
//                 width: "100%",
//                 marginHorizontal: 16,
//               }}
//             >
//               <View
//                 style={{
//                   ...styles.wrapper,
//                   paddingBottom: isKeyboard ? 16 : 0,
//                 }}
//               >
//                 {/* <View style={styles.avatar} /> */}
//                 {/* <View style={{ height: 60 }} /> */}
//                 <Text style={styles.title}>Увійти</Text>
//                 <View
//                   style={{ width: "100%" }}
//                   onFocus={() => isKeyboardOpen(true)}
//                   onBlur={() => isKeyboardOpen(false)}
//                 >
//                   {/* <TextInput
//                     value={name}
//                     onChangeText={nameHandler}
//                     placeholder="Username"
//                     style={styles.input}
//                   /> */}
//                   <Input
//                     value={email}
//                     onChangeText={emailHandler}
//                     placeholder="Адреса електронної пошти"
//                     style={styles.input}
//                   />
//                   <Input
//                     value={password}
//                     onChangeText={passwordHandler}
//                     placeholder="Пароль"
//                     secureTextEntry={true}
//                     style={styles.input}
//                   />
//                 </View>
//               </View>
//             </KeyboardAvoidingView>

//             <View style={{ width: "100%", backgroundColor: "#ffffff" }}>
//               <TouchableOpacity style={styles.btn} onPress={onLogin}>
//                 <Text>Увійти</Text>
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Text style={styles.btnAcount}>
//                   Немає акаунту?
//                   <Text style={{ textDecorationLine: "underline" }}>
//                     Зареєструватися
//                   </Text>
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ImageBackground>
//         </TouchableWithoutFeedback>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bgImage: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     height: "100%",
//   },
//   wrapper: {
//     width: "100%",
//     backgroundColor: "#ffffff",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   avatar: {
//     top: -60,
//     width: 120,
//     height: 120,
//     position: "absolute",
//     backgroundColor: "#F6F6F6",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   title: {
//     marginTop: 32,
//     marginBottom: 23,
//     color: "#212121",
//     textAlign: "center",
//     // fontFamily: "RobotoMedium",
//     fontSize: 30,
//     letterSpacing: 0.3,
//   },
//   //   input: {
//   //     marginHorizontal: 16,
//   //     marginBottom: 16,
//   //     height: 50,
//   //     padding: 16,
//   //     color: "#BDBDBD",
//   //     fontFamily: "Roboto",
//   //     fontSize: 16,
//   //     backgroundColor: "#F6F6F6",
//   //     borderRadius: 10,
//   //     borderWidth: 1,
//   //     borderColor: "#E8E8E8",
//   //   },
//   btn: {
//     height: 51,
//     marginTop: 27,
//     marginBottom: 16,
//     marginHorizontal: 16,
//     borderRadius: 100,
//     backgroundColor: "#FF6C00",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnAcount: {
//     marginBottom: 78,
//     marginRight: 10,
//     color: "#1B4371",
//     fontFamily: "Roboto",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
export default function App() {
  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

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
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground
          source={require("../assets/images/bgImage.png")}
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
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputsContainer}>
              <TextInput
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                style={{
                  ...styles.input,
                  borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адреса електронної пошти"
              />
              <TextInput
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                style={{
                  ...styles.input,
                  borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Пароль"
              />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: "16",
                  color: "#FFFFFF",
                }}
              >
                Увійти
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.btnAcount}>
                Немає акаунту?
                <Text style={{ textDecorationLine: "underline" }}>
                  Зареєструватися
                </Text>
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
  title: {
    fontFamily: "Roboto",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputsContainer: { gap: 10, width: "100%", padding: 10, marginBottom: 30 },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: "flex-end",
  },
  formWrapper: {
    marginTop: 170,
    paddingTop: 35,
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
});
