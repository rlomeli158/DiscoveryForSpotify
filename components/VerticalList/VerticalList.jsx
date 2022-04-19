import { FlatList, Image } from "react-native";
import styles from "../../constants/styles";
import { getImageUrl, getSongInfo, renderSongInfo } from "../Gallery/Gallery";
import { Text, View } from "../Themed";

const VerticalList = ({ title, data }) => {
  return (
    <View>
      <Text style={styles.pageSubHeader}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const imageUrl = getImageUrl(item);
          const songInfoArray = getSongInfo(item);

          const songName = songInfoArray[0];
          const artists = songInfoArray[1];
          const artistName = songInfoArray[2];
          const playlistName = songInfoArray[3];

          return (
            <View style={styles.songContainer}>
              <Image style={styles.listImage} source={{ uri: imageUrl }} />
              <View style={styles.listText}>
                {renderSongInfo(songName, artists, artistName, playlistName)}
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
      ></FlatList>
    </View>
  );
};

export default VerticalList;
