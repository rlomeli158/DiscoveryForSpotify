import { FlatList, Image, Pressable } from "react-native";
import { View, Text } from "../Themed";
import styles from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

export const defaultImage =
  "https://images.unsplash.com/photo-1565656898731-61d5df85f9a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60";

const Gallery = ({ title, data }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pageSubHeader}>{title}</Text>
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
                if (songName) {
                  console.log(songName);
                  navigation.navigate("Info", {
                    type: item.type,
                    id: item.id,
                  });
                } else {
                  console.log(artistName);
                  navigation.navigate("Info", {
                    type: item.type,
                    id: item.id,
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
      <Text style={styles.artistName} numberOfLines={2}>
        {nameToRender}
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
