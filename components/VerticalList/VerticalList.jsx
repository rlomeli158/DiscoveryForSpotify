import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Pressable } from "react-native";
import styles from "../../constants/styles";
import { getImageUrl, getSongInfo, renderSongInfo } from "../Gallery/Gallery";
import { Text, View } from "../Themed";

const VerticalList = ({ title, data, albumImage = "", numberOfTracks }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.pageSubHeader}>
        {numberOfTracks ? `${numberOfTracks} ${title}` : title}
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.added_at) {
            item = item.track;
          }
          let imageUrl = albumImage;
          if (albumImage == "") {
            imageUrl = getImageUrl(item);
          }

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
                  id: numberOfTracks ? item.id : item.track.id,
                });
              }}
            >
              <View style={styles.songContainer}>
                <Image style={styles.listImage} source={{ uri: imageUrl }} />
                <View style={styles.listText}>
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

export default VerticalList;
