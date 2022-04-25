import { Text, View } from "../Themed";
import { getImageUrl } from "../Gallery/Gallery";
import { getSongInfo } from "../Gallery/Gallery";
import { useNavigation } from "@react-navigation/native";
import styles from "../../constants/styles";
import { Image, FlatList, Pressable } from "react-native";
import { breakUpArtistArray } from "../Gallery/Gallery";

const numColumns = 3;

const Grid = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={numColumns}
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
                navigation.push("InfoScreenTrack", {
                  type: "track",
                  id: item.id ? item.id : item.track.id,
                });
              }}
            >
              <View style={styles.itemContainerInGrid}>
                <Image
                  style={styles.itemImageInGrid}
                  source={{ uri: imageUrl }}
                />
                <View style={styles.itemTextInGrid}>
                  {renderSongInfoGrid(
                    songName,
                    artists,
                    artistName,
                    playlistName
                  )}
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

const renderSongInfoGrid = (songName, artists, artistName, playlistName) => {
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
      <Text style={styles.songNameInGrid} numberOfLines={1}>
        {songName}
      </Text>
      <Text style={styles.artistNameWithSongInGrid} numberOfLines={1}>
        {artistString}
      </Text>
    </>
  );
};

export default Grid;
