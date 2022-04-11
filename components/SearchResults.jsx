import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  Button,
  View as DefaultView,
} from "react-native";
import CustomColors from "../constants/Colors";
import { Text, View } from "./Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { testObj } from "./GenreListings";

const defaultImage =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const genreImage =
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

export default function SearchResult({
  artistData,
  selectedItems,
  setSelectedItems,
}) {
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={artistData}
        renderItem={({ item }) => {
          if (item.displayName) {
            return (
              <View
                style={styles.listContainer}
                onStartShouldSetResponder={() => {
                  let newList = selectedItems.slice();
                  if (!newList.includes(item) && newList.length < 5) {
                    console.log("pushing", JSON.stringify(item));
                    newList.push(item);
                    setSelectedItems(newList);
                  }
                }}
              >
                <Image style={styles.image} source={{ uri: genreImage }} />
                <View style={styles.textContainer}>
                  <Text style={styles.songName}>{item.displayName}</Text>
                  <Text style={styles.artistNameWithSong}>Genre</Text>
                </View>
              </View>
            );
          }
          return (
            <View
              style={styles.listContainer}
              onStartShouldSetResponder={() => {
                let newList = selectedItems.slice();
                if (!newList.includes(item) && newList.length < 5) {
                  newList.push(item);
                  setSelectedItems(newList);
                }
              }}
            >
              <Image
                style={styles.image}
                source={
                  item.album
                    ? item.album.images[0]
                      ? { uri: item.album.images[0].url }
                      : { uri: defaultImage }
                    : item.images[0]
                    ? { uri: item.images[0].url }
                    : { uri: defaultImage }
                }
              />
              {item.artists && item.album ? (
                renderSongInfo(item)
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.artistName}>{item.name}</Text>
                </View>
              )}
              {typeof item === typeof "string" ? <Text>hi</Text> : null}
            </View>
          );
        }}
        keyExtractor={(item) => (item.id ? item.id : item.spotifyName)}
      />
    </View>
  );
}

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
    <View style={styles.textContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.songName}>{songName} </Text>
        {songInfo.explicit ? (
          <MaterialIcons name="explicit" size={12} color="white" />
        ) : null}
      </View>
      <Text style={styles.artistNameWithSong}>{artistString}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  artistName: {
    fontSize: 15,
  },
  artistNameWithSong: {
    fontSize: 13,
    color: CustomColors.dark.primaryColor,
  },
  songName: {
    fontSize: 15,
  },
});
