import React from "react";
import { FlatList, Image, Pressable } from "react-native";
import { Text, View } from "../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/features/selectedItems";
import { useNavigation } from "@react-navigation/native";

const defaultImage =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const genreImage =
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

const SearchResult = ({ artistData, needsOnClick }) => {
  const newSelectedItems = useSelector((state) => state.selectedItems.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addToSelectedItems = (item) => {
    if (!newSelectedItems.includes(item) && newSelectedItems.length < 5) {
      dispatch(addItem(item));
    }
  };
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={artistData}
        renderItem={({ item }) => {
          if (item.displayName) {
            return (
              <View
                style={styles.resultsContainer}
                onStartShouldSetResponder={() => {
                  if (!needsOnClick) {
                    addToSelectedItems(item);
                  }
                }}
              >
                <Image
                  style={styles.resultsImage}
                  source={{ uri: genreImage }}
                />
                <View style={styles.songInformationTextContainer}>
                  <Text style={styles.resultsSongName}>{item.displayName}</Text>
                  <Text style={styles.resultsArtistNameWithSong}>Genre</Text>
                </View>
              </View>
            );
          }
          return (
            <View
              style={styles.resultsContainer}
              onStartShouldSetResponder={() => {
                if (!needsOnClick) {
                  addToSelectedItems(item);
                } else if (item.type == "album") {
                  navigation.push("InfoScreenAlbum", {
                    id: item.id,
                  });
                } else if (item.type == "track") {
                  navigation.push("InfoScreenTrack", {
                    type: "track",
                    id: item.id,
                  });
                } else if (item.type == "artist") {
                  navigation.push("InfoScreenArtist", {
                    type: item.type,
                    id: item.id,
                  });
                } else if (playlistName) {
                  navigation.push("InfoScreenPlaylist", {
                    playlist: item,
                  });
                }
              }}
            >
              <Image
                style={styles.resultsImage}
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
                <View style={styles.songInformationTextContainer}>
                  <Text style={styles.resultsArtistName}>{item.name}</Text>
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
    <View style={styles.songInformationTextContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.resultsSongName}>{songName} </Text>
        {songInfo.explicit ? (
          <MaterialIcons name="explicit" size={12} color="white" />
        ) : null}
      </View>
      <Text style={styles.resultsArtistNameWithSong}>{artistString}</Text>
    </View>
  );
};

export default SearchResult;
