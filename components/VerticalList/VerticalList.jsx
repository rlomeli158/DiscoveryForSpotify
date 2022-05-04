import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Pressable } from "react-native";
import styles from "../../constants/styles";
import { getImageUrl, getSongInfo, renderSongInfo } from "../Gallery/Gallery";
import { Text, View } from "../Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { playTrack, stopTrack } from "../../screens/InfoScreenTrack";

const VerticalList = ({ title, data, albumImage = "", numberOfTracks }) => {
  const navigation = useNavigation();
  const playingSound = useSelector((state) => state.playingSound.value);
  const soundSource = useSelector((state) => state.playingSound.source);
  const dispatch = useDispatch();

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

          let trackUrl;

          if (item.preview_url) {
            trackUrl = item.preview_url;
          } else if (item.track.preview_url) {
            trackUrl = item.track.preview_url;
          } else if (item.album.preview_url) {
            trackUrl = item.album.preview_url;
          }

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
                {trackUrl ? (
                  playingSound && soundSource == trackUrl ? (
                    <Pressable
                      onPress={() => {
                        stopTrack(playingSound, dispatch);
                      }}
                      style={{ justifyContent: "center" }}
                    >
                      <FontAwesome
                        style={{
                          marginHorizontal: 20,
                        }}
                        name="pause-circle"
                        size={30}
                        color="white"
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        if (playingSound && soundSource != trackUrl) {
                          stopTrack(playingSound, dispatch);
                        }
                        playTrack(trackUrl, dispatch);
                      }}
                      style={{ justifyContent: "center" }}
                    >
                      <FontAwesome
                        style={{
                          marginHorizontal: 20,
                        }}
                        name="play-circle"
                        size={30}
                        color="white"
                      />
                    </Pressable>
                  )
                ) : null}
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
