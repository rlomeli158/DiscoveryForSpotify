import { useEffect, useState } from "react";
import { Pressable, Dimensions, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import {
  callGetArtistAlbums,
  callGetArtistTopTracks,
  callGetInfo,
  callGetRelatedArtists,
} from "../client/spotifyClient";
import Gallery, {
  breakUpArtistArray,
  getImageUrl,
} from "../components/Gallery/Gallery";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CustomColors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { playTrack, stopTrack } from "../components/Carousel/InfoAndPlayer";

const { width: screenWidth } = Dimensions.get("window");

const InfoScreenTrack = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const { type, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(async () => {
    setTrack(await callGetInfo(type, id, token));
    // Get audio features
    // Tracks like this
    // Add song to your liked
    setLoading(false);
  }, []);

  const imageUrl = getImageUrl(track);

  // Popularity
  const activePopularityIcons = Math.round(track.popularity / 10);
  const inactivePopularityIcons = 10 - activePopularityIcons;

  return (
    <ScrollView
      style={styles.infoPageContainer}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {loading ? (
        loadingIcon()
      ) : (
        <>
          <Image style={styles.infoImage} source={{ uri: imageUrl }} />
          <View style={styles.infoPageTextContainer}>
            <View style={{ flexDirection: "row" }}>
              {renderSongInfo(track.name, track.artists)}
            </View>
            {renderPlayButton(track, sound, setSound)}
            {renderPopularity(activePopularityIcons, inactivePopularityIcons)}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export const loadingIcon = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: screenWidth,
        width: screenWidth,
      }}
    >
      <AntDesign
        name="loading1"
        size={100}
        color={CustomColors.dark.primaryColor}
      />
    </View>
  );
};

const renderPopularity = (activePopularityIcons, inactivePopularityIcons) => {
  return (
    <View>
      <Text style={styles.pageSubHeader}>Popularity</Text>
      <View
        style={{
          paddingTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {[...Array(activePopularityIcons)].map((value, index) => (
          <FontAwesome
            name="user-circle"
            size={screenWidth / 11.5}
            color={CustomColors.dark.primaryColor}
            key={index}
          />
        ))}
        {[...Array(inactivePopularityIcons)].map((value, index) => (
          <FontAwesome
            name="user-circle-o"
            size={screenWidth / 11.5}
            color={CustomColors.dark.formBackground}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

const renderSongInfo = (songName, artists) => {
  const artistString = breakUpArtistArray(artists);

  return (
    <View style={{ flexDirection: "column" }}>
      <Text style={styles.songNameInfoPage}>{songName}</Text>
      <Text style={styles.artistNameInfoPage}>{artistString}</Text>
    </View>
  );
};

const renderPlayButton = (track, sound, setSound) => {
  return track.preview_url ? (
    sound ? (
      <View style={([styles.playContainer], { alignSelf: "center" })}>
        <Pressable
          onPress={() => {
            stopTrack(sound, setSound);
          }}
        >
          <Ionicons name="pause-circle-outline" size={80} color="white" />
        </Pressable>
      </View>
    ) : (
      <View style={([styles.playContainer], { alignSelf: "center" })}>
        <Pressable
          onPress={() => {
            playTrack(track.preview_url, setSound);
          }}
        >
          <Ionicons name="play-circle-outline" size={80} color="white" />
        </Pressable>
      </View>
    )
  ) : null;
};

export default InfoScreenTrack;
