import { FlatList, Image, Pressable } from "react-native";
import { View, Text } from "../Themed";
import styles from "../../constants/styles";

const defaultImage =
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

const Gallery = ({ title, data }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pageSubHeader}>{title}</Text>
      <FlatList
        horizontal={true}
        style={styles.galleryList}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const imageUrl = getImageUrl(item);

          const songInfoArray = getSongInfo(item);

          const songName = songInfoArray[0];
          const artists = songInfoArray[1];
          const artistName = songInfoArray[2];

          return (
            <Pressable
              onPress={() => {
                if (songName) {
                  console.log(songName);
                } else {
                  console.log(artistName);
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
                  {renderSongInfo(songName, artists, artistName)}
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => (item.track ? item.track.name : item.name)}
      />
    </View>
  );
};

const renderSongInfo = (songName, artists, artistName) => {
  if (artistName) {
    return (
      <Text style={styles.artistName} numberOfLines={2}>
        {artistName}
      </Text>
    );
  }

  const artistString = breakUpArtistArray(artists);

  return (
    <>
      <Text style={styles.songName}>{songName}</Text>
      <Text style={styles.artistNameWithSong}>{artistString}</Text>
    </>
  );
};

const getImageUrl = (item) => {
  let imageUrl = "";

  if (item.played_at) {
    if (item.track.album.images[0].url) {
      imageUrl = item.track.album.images[0].url;
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

const getSongInfo = (item) => {
  let songName = "";
  let artists = "";
  let artistName = "";

  if (item.played_at) {
    songName = item.track.name;
    artists = item.track.artists;
  } else if (item.artists && item.album) {
    songName = item.name;
    artists = item.artists;
  } else {
    artistName = item.name;
  }

  return [songName, artists, artistName];
};

const breakUpArtistArray = (artists) => {
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
