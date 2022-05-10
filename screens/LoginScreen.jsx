import { SCREEN_WIDTH, WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Pressable, ImageBackground, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkIfExpired, getTokens } from "../client/authenticationClient";
import { View, Text } from "../components/Themed";
import * as SecureStore from "expo-secure-store";
import styles from "../constants/styles";
import { loadingIcon } from "./InfoScreenArtist";
import { ScrollView } from "react-native-gesture-handler";

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const LoginScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const [tokenReceived, setTokenReceived] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (!route.params) {
      const currentToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
      if (currentToken) {
        // setLoading(true);
        await getTokens(setTokenReceived, dispatch);
      }
    }
  }, []);

  useEffect(async () => {
    if (tokenReceived & !route.params) {
      navigation.navigate("Root", {
        screen: "HomeScreen",
      });
    }
  }, [tokenReceived]);

  return (
    <ImageBackground
      style={{ height: WINDOW_HEIGHT, width: SCREEN_WIDTH }}
      source={require(".././assets/images/blackCircularGradient.png")}
      // blurRadius={10}
    >
      {loading ? (
        <ScrollView style={{ marginTop: 80 }}>{loadingIcon()}</ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={require("../assets/images/DiscoveryLogo.png")}
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 20,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 50,
                    alignContent: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    textAlign: "left",
                  }}
                >
                  Discovery
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.logInButton}
              onPress={async () => {
                setLoading(true);
                const result = await getTokens(setTokenReceived, dispatch);
                if (token && result) {
                  navigation.navigate("Root", {
                    screen: "HomeScreen",
                  });
                  setTokenReceived(false);
                }
                setLoading(false);
              }}
            >
              <Text style={styles.logInButtonText}>Log in with Spotify</Text>
              <Image
                style={{ height: 20, width: 20, marginLeft: 5 }}
                source={require("../assets/images/Spotify_Icon_RGB_White.png")}
              />
            </Pressable>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;
