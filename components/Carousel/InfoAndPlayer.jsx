import * as React from "react";
import {
  Pressable,
  Animated,
  //   Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import CustomColors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Text } from "../Themed";

const { width } = Dimensions.get("screen");

const OVERFLOW_HEIGHT = 180;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated, sound, setSound }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          const trackDetails = getTrackDetails(item);
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.songName]} numberOfLines={2}>
                {trackDetails[0]}
              </Text>
              <Text style={[styles.artistName]} numberOfLines={2}>
                {trackDetails[1]}
              </Text>
              {item.preview_url ? (
                sound ? (
                  <View style={styles.playContainer}>
                    <Pressable
                      onPress={() => {
                        stopTrack(sound, setSound);
                      }}
                    >
                      <Ionicons
                        name="pause-circle-outline"
                        size={80}
                        color="white"
                      />
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.playContainer}>
                    <Pressable
                      onPress={() => {
                        playTrack(item.preview_url, setSound);
                      }}
                    >
                      <Ionicons
                        name="play-circle-outline"
                        size={80}
                        color="white"
                      />
                    </Pressable>
                  </View>
                )
              ) : null}
              <View style={styles.itemContainerRow}></View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const playTrack = async (link, setSound) => {
  const source = { uri: link };

  const { sound } = await Audio.Sound.createAsync(source);
  setSound(sound);

  await sound.playAsync();
};

const stopTrack = async (sound, setSound) => {
  if (sound) {
    await sound.unloadAsync();
    setSound(false);
  }
};

const getTrackDetails = (songInfo) => {
  const songName = songInfo.name;
  const artists = songInfo.artists;
  let artistName = "";
  if (artists.length === 1) {
    artistName += artists[0].name;
  } else {
    artists.forEach((artist) => {
      artistName += artist.name + ", ";
    });
    artistName = artistName.slice(0, -2);
  }
  return [songName, artistName];
};

const styles = StyleSheet.create({
  songName: {
    fontSize: 23,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#FFF",
    letterSpacing: -1,
    textAlign: "center",
  },
  artistName: {
    fontSize: 15,
    fontWeight: "900",
    textTransform: "uppercase",
    color: CustomColors.dark.primaryColor,
    letterSpacing: -1,
    textAlign: "center",
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
  playContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OverflowItems;
