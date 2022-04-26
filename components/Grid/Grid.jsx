import { Text, View } from "../Themed";
import { getImageUrl } from "../Gallery/Gallery";
import { getSongInfo } from "../Gallery/Gallery";
import { useNavigation, StackActions } from "@react-navigation/native";
import styles from "../../constants/styles";
import { Image, FlatList, Pressable } from "react-native";
import { breakUpArtistArray } from "../Gallery/Gallery";

const Grid = ({ data, size }) => {
  let numColumns = 3;
  if (size != "small") {
    numColumns = 2;
  }
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={numColumns}
        key={numColumns}
        renderItem={({ item }) => {
          if (item.added_at) {
            item = item.track;
          }
          let imageUrl = getImageUrl(item);

          const songInfoArray = getSongInfo(item);

          const songName = songInfoArray[0];
          const artists = songInfoArray[1];
          const artistName = songInfoArray[2];
          const playlistName = songInfoArray[3];

          return (
            <Pressable
              onPress={() => {
                if (item.type === "track") {
                  navigation.navigate("InfoScreenTrack", {
                    type: "track",
                    id: item.id ? item.id : item.track.id,
                  });
                } else {
                  navigation.navigate("InfoScreenArtist", {
                    type: "artist",
                    id: item.id,
                  });
                }
              }}
            >
              <View
                style={
                  size == "small"
                    ? styles.itemContainerInGridSmall
                    : styles.itemContainerInGridLarge
                }
              >
                <Image
                  style={
                    size == "small"
                      ? styles.itemImageInGridSmall
                      : styles.itemImageInGridLarge
                  }
                  source={{ uri: imageUrl }}
                />
                <View>
                  {renderSongInfoGrid(
                    songName,
                    artists,
                    artistName,
                    playlistName,
                    size
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const renderSongInfoGrid = (
  songName,
  artists,
  artistName,
  playlistName,
  size
) => {
  if (artistName || playlistName) {
    const nameToRender = artistName ? artistName : playlistName;
    return (
      <Text
        style={
          size == "small"
            ? styles.artistNameInGridSmall
            : styles.artistNameInGridLarge
        }
        numberOfLines={1}
      >
        {nameToRender}
      </Text>
    );
  }

  const artistString = breakUpArtistArray(artists);

  return (
    <>
      <Text
        style={
          size == "small"
            ? styles.songNameInGridSmall
            : styles.songNameInGridLarge
        }
        numberOfLines={1}
      >
        {songName}
      </Text>
      <Text
        style={
          size == "small"
            ? styles.artistNameWithSongInGridSmall
            : styles.artistNameWithSongInGridLarge
        }
        numberOfLines={1}
      >
        {artistString}
      </Text>
    </>
  );
};

export default Grid;
