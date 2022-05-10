import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { Image } from "react-native";
import styles from "../constants/styles";
import { View, Text } from "./Themed";

const CurrentlyPlaying = (currentTrack) => {
  return (
    <View style={styles.currentlyPlayingContainer}>
      <Image
        style={{
          flex: 1,
          //   height: "100%",
          //   width: "30%",
          resizeMode: "contain",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        }}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
        }}
      />
      <Text>Hi there!</Text>
    </View>
  );
};

export default CurrentlyPlaying;
