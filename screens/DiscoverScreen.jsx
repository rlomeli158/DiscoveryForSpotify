import { useEffect } from "react";
import { ScrollView } from "react-native";
import SearchField from "../components/Discover/SearchField";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";

import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/features/token";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function Discover({ navigation }) {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "4f0fe728346848b691b85459ebeadb89",
      scopes: ["user-read-email", "playlist-modify-public"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "myapp",
        preferLocalhost: true,
        isTripleSlashed: true,
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      dispatch(setToken(access_token));
      // if (Platform.OS !== "web") {
      //   // Securely store the auth on your device
      //   SecureStore.setItemAsync(KEY_FOR_TOKEN, access_token);
      //   console.log("securely stored");
      // }
    }
  }, [response]);

  useEffect(async () => {
    if (!token && request) {
      promptAsync();
    }
  }, [request]);

  return (
    <ScrollView style={styles.discoverPageContainer}>
      <View>
        <Text style={styles.pageHeader}>Discover</Text>
      </View>
      <View>
        <SearchField error="" />
      </View>
    </ScrollView>
  );
}

// async function getValueFor(key) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result);
//   } else {
//     alert("No values stored under that key.");
//   }
// }
