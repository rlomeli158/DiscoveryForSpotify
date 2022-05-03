import { SCREEN_WIDTH, WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Pressable, ImageBackground, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTokens } from "../client/authenticationClient";
import { View, Text } from "../components/Themed";
import * as SecureStore from "expo-secure-store";
import styles from "../constants/styles";

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const LoginScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const [tokenReceived, setTokenReceived] = useState(false);

  useEffect(async () => {
    const currentToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
    if (currentToken) {
      await getTokens(setTokenReceived, dispatch);
    }
    //   await getTokens(setTokenReceived, dispatch);
  }, []);

  useEffect(async () => {
    if (tokenReceived) {
      navigation.push("Root", {
        screen: "HomeScreen",
      });
    }
  }, [tokenReceived]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ height: WINDOW_HEIGHT, width: SCREEN_WIDTH }}
        source={require("../assets/images/splashScreenV1.png")}
      />
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.0000001)",
          position: "absolute",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Pressable
          style={styles.logInButton}
          onPress={async () => {
            await getTokens(setTokenReceived, dispatch);
          }}
        >
          <Text style={styles.logInButtonText}>Log in with Spotify</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
