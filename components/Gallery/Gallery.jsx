import { FlatList, Image } from "react-native";
import { View, Text } from "../Themed";
import styles from "../../constants/styles";

const defaultImage =
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

const Gallery = ({ title, data }) => {
  return (
    <View>
      <Text style={styles.pageSubHeader}>{title}</Text>
      <FlatList
        horizontal={true}
        style={styles.galleryList}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.galleryView}>
              <Image
                style={styles.galleryImage}
                source={
                  item.album
                    ? item.album.images[0]
                      ? { uri: item.album.images[0].url }
                      : { uri: defaultImage }
                    : item.images
                    ? item.images[0]
                      ? { uri: item.images[0].url }
                      : { uri: defaultImage }
                    : item.played_at
                    ? item.track.album.images[0]
                      ? { uri: item.track.album.images[0].url }
                      : { uri: defaultImage }
                    : {
                        uri: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                      }
                }
              />
              <View style={styles.galleryText}>
                {(item.artists && item.album) || item.played_at ? (
                  renderSongInfo(item)
                ) : item.images ? (
                  <Text style={styles.artistName} numberOfLines={2}>
                    {item.name}
                  </Text>
                ) : (
                  <Text style={styles.artistName}>{item.displayName}</Text>
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => (item.track ? item.track.name : item.name)}
      />
    </View>
  );
};

const renderSongInfo = (songInfo) => {
  if (songInfo.played_at) {
    songInfo.name = songInfo.track.name;
    songInfo.artists = songInfo.track.artists;
  }
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

export default Gallery;
