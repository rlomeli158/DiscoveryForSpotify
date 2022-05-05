import React from "react";
import { ParallaxImage } from "react-native-snap-carousel";
import { Pressable, SafeAreaView } from "react-native";
import { Text, View } from "../../Themed";
import styles from "../../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomColors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import { removeItem } from "../../../redux/features/selectedItems";
import { AntDesign } from "@expo/vector-icons";

const CarouselItem = ({ item, index }, parallaxProps, dispatch) => {
  return (
    <Pressable>
      <SafeAreaView style={styles.carouselItem}>
        <ParallaxImage
          source={
            item.album
              ? item.album.images[0]
                ? { uri: item.album.images[0].url }
                : { uri: defaultImage }
              : item.images
              ? item.images[0]
                ? { uri: item.images[0].url }
                : { uri: defaultImage }
              : {
                  uri: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                }
          }
          containerStyle={styles.carouselImageContainer}
          style={styles.carouselImage}
          {...parallaxProps} /* pass in the necessary props */
        />
        <Pressable
          onPress={() => {
            dispatch(removeItem(item));
          }}
          style={{ position: "absolute", top: 0, left: -15 }}
        >
          <AntDesign
            name="closecircle"
            size={50}
            color={CustomColors.dark.primaryColor}
          />
        </Pressable>
        {item.artists && item.album ? (
          renderSongInfo(item)
        ) : item.images ? (
          <Text style={styles.artistName} numberOfLines={2}>
            {item.name}
          </Text>
        ) : (
          <Text style={styles.artistName}>{item.displayName}</Text>
        )}
      </SafeAreaView>
    </Pressable>
  );
};

const renderSongInfo = (songInfo) => {
  const songName = songInfo.name;
  const artists = songInfo.artists;
  let artistString = "";
  if (artists.length === 1) {
    artistString += artists[0].name;
  } else {
    artists.forEach((artist) => {
      artistString += artist.name + ", ";
    });
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
