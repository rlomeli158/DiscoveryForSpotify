import { FlatList, Image, Pressable } from "react-native";
import { View, Text } from "../Themed";
import styles from "../../constants/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/features/selectedItems";
import { AntDesign } from "@expo/vector-icons";
import CustomColors from "../../constants/Colors";

export const defaultImage =
  "https://images.unsplash.com/photo-1565656898731-61d5df85f9a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60";

const Gallery = ({ title, data, selectedItems, isTop }) => {
  const newSelectedItems = useSelector((state) => state.selectedItems.items);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginRight: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.pageSubHeader}>{title}</Text>
        {isTop ? (
          <Pressable
            style={{ justifyContent: "center" }}
            onPress={() => {
              if (title.includes("Songs")) {
                navigation.navigate("Root", {
                  screen: "TopScreen",
                  params: {
                    screen: "Top",
                    params: {
                      tab: "tracks",
                    },
                  },
                });
              } else {
                navigation.navigate("Root", {
                  screen: "TopScreen",
                  params: {
                    screen: "Top",
                    params: {
                      tab: "artists",
                    },
                  },
                });
              }
            }}
          >
            <AntDesign name="rightcircleo" size={24} color="#FFF" />
          </Pressable>
        ) : null}
      </View>
      <FlatList
        horizontal={true}
        style={styles.galleryList}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const itemIndex = index;
          const imageUrl = getImageUrl(item);

          const songInfoArray = getSongInfo(item);

          const songName = songInfoArray[0];
          const artists = songInfoArray[1];
          const artistName = songInfoArray[2];
          const playlistName = songInfoArray[3];

          return (
            <Pressable
              onPress={() => {
                if (selectedItems) {
                  if (item.played_at) {
                    item = item.track;
                  }
                  if (
                    !newSelectedItems.includes(item) &&
                    newSelectedItems.length < 5
                  ) {
                    dispatch(addItem(item));
                  }
                } else if (item.type == "album") {
                  navigation.push("InfoScreenAlbum", {
                    id: item.id,
                  });
                } else if (songName) {
                  navigation.push("InfoScreenTrack", {
                    type: "track",
                    id: item.id,
                  });
                } else if (artistName) {
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
              <View style={styles.galleryView}>
                <Image
                  style={styles.galleryImage}
                  source={{
                    uri: imageUrl,
                  }}
                />
                <View style={styles.galleryText}>
                  {renderSongInfo(songName, artists, artistName, playlistName)}
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
      />
    </View>
  );
};

export const renderSongInfo = (songName, artists, artistName, playlistName) => {
  if (artistName || playlistName) {
    const nameToRender = artistName ? artistName : playlistName;
    return (
      <Text style={styles.artistName} numberOfLines={1}>
        {nameToRender}
      </Text>
    );
  }

  const artistString = breakUpArtistArray(artists);

  return (
    <>
      <Text style={styles.songName} numberOfLines={1}>
        {songName}
      </Text>
      <Text style={styles.artistNameWithSong} numberOfLines={1}>
        {artistString}
      </Text>
    </>
  );
};

export const getImageUrl = (item) => {
  let imageUrl = "";

  if (item.played_at) {
    if (item.track.album.images[0].url) {
      imageUrl = item.track.album.images[0].url;
    }
  } else if (item.owner) {
    if (item.images.length > 0) {
      imageUrl = item.images[0].url;
    } else {
      imageUrl = defaultImage;
    }
  } else if (item.album) {
    if (item.album.images[0].url) {
      imageUrl = item.album.images[0].url;
    }
  } else if (item.images) {
    if (item.images[0].url) {
      imageUrl = item.images[0].url;
    }
  }
  if (imageUrl == "") {
    imageUrl = defaultImage;
  }
  return imageUrl;
};

export const getSongInfo = (item) => {
  let songName = "";
  let artists = "";
  let artistName = "";
  let playlistName = "";

  if (item.played_at) {
    songName = item.track.name;
    artists = item.track.artists;
  } else if (item.album_type == "single") {
    artists = item.artists;
    songName = item.name;
  } else if (item.artists && item.album) {
    songName = item.name;
    artists = item.artists;
  } else if (item.owner) {
    playlistName = item.name;
  } else {
    artistName = item.name;
  }

  return [songName, artists, artistName, playlistName];
};

export const breakUpArtistArray = (artists) => {
  let artistString = "";
  if (artists.length === 1) {
    artistString += artists[0].name;
  } else {
    artists.forEach((artist) => {
      artistString += artist.name + ", ";
    });
    artistString = artistString.slice(0, -2);
  }

  return artistString;
};

export default Gallery;
