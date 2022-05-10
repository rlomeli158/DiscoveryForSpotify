import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Pressable } from "react-native";
import styles from "../../constants/styles";
import { getImageUrl, getSongInfo, renderSongInfo } from "../Gallery/Gallery";
import { Text, View } from "../Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { playTrack, stopTrack } from "../../screens/InfoScreenTrack";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const VerticalList = ({
  title,
  data,
  albumImage = "",
  numberOfTracks,
  isCurrentlyPlaying = false,
}) => {
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

          try {
            if (item.preview_url) {
              trackUrl = item.preview_url;
            } else if (item.track.preview_url) {
              trackUrl = item.track.preview_url;
            } else if (item.album) {
              if (item.album.preview_url) {
                trackUrl = item.album.preview_url;
              }
            }
          } catch (err) {
            console.error("ERROR", err, songInfoArray);
          }

          return (
            <Pressable
              onPress={() => {
                if (isCurrentlyPlaying) {
                  navigation.push("InfoScreenTrack", {
                    type: "track",
                    id: item.id,
                  });
                } else {
                  navigation.push("InfoScreenTrack", {
                    type: "track",
                    id: numberOfTracks ? item.id : item.track.id,
                  });
                }
              }}
            >
              <View style={styles.songContainer}>
                <Image style={styles.listImage} source={{ uri: imageUrl }} />
                <View style={styles.listText}>
                  {renderSongInfo(songName, artists, artistName, playlistName)}
                </View>
                {isCurrentlyPlaying ? (
                  <Image
                    style={{
                      resizeMode: "contain",
                      height: SCREEN_HEIGHT / 15,
                      width: SCREEN_WIDTH / 4,
                      alignItems: "flex-end",
                      alignSelf: "center",
                      justifyContent: "flex-end",
                    }}
                    source={require("../../assets/images/audio-wave.gif")}
                  />
                ) : trackUrl ? (
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
