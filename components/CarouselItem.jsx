import React from "react";
import { ParallaxImage } from "react-native-snap-carousel";
import { Pressable, SafeAreaView } from "react-native";
import { Text, View } from "./Themed";
import styles from "../constants/styles";

function CarouselItem({ item, index }, parallaxProps) {
  return (
    <Pressable>
      <SafeAreaView style={styles.carouselItem}>
        <ParallaxImage
          source={
            item.album
              ? item.album.images[0]
                ? { uri: item.album.images[0].url }
                : { uri: defaultImage }
              : item.images[0]
              ? { uri: item.images[0].url }
              : { uri: defaultImage }
          }
          containerStyle={styles.carouselImageContainer}
          style={styles.carouselImage}
          {...parallaxProps} /* pass in the necessary props */
        />
        {item.artists && item.album ? (
          renderSongInfo(item)
        ) : (
          <Text style={styles.carouselTitle} numberOfLines={2}>
            {item.name}
          </Text>
        )}
      </SafeAreaView>
    </Pressable>
  );
}

const renderSongInfo = (songInfo) => {
  const songName = songInfo.name;
  const artists = songInfo.artists;
  let artistString = "";
  if (artists.length === 1) {
    artistString += artists[0].name;
    console.log(artistString);
  } else {
    artists.forEach((artist) => {
      artistString += artist.name + ", ";
    });
    console.log(artistString);
    artistString = artistString.slice(0, -2);
  }
  return (
    <View style={styles.songInfoContainer}>
      <Text style={styles.songName}>{songName}</Text>
      <Text style={styles.artistNameWithSong}>{artistString}</Text>
    </View>
  );
};

export default CarouselItem;
