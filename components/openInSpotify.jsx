import { Image, Pressable } from "react-native";
import { Text } from "./Themed";
import styles from "../constants/styles";
import { Linking } from "react-native";

const OpenInSpotify = (link) => {
  return (
    <Pressable
      style={styles.logInButton}
      onPress={() => {
        Linking.openURL(link);
      }}
    >
      <Text style={styles.logInButtonText}>Open in Spotify</Text>
      <Image
        style={{ height: 20, width: 20, marginLeft: 5 }}
        source={require("../assets/images/Spotify_Icon_RGB_White.png")}
      />
    </Pressable>
  );
};

export default OpenInSpotify;
