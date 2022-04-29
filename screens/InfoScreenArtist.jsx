import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import {
  callGetArtistAlbums,
  callGetArtistTopTracks,
  callGetInfo,
  callGetRelatedArtists,
} from "../client/spotifyClient";
import Gallery, { getImageUrl } from "../components/Gallery/Gallery";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CustomColors from "../constants/Colors";
import * as Progress from "react-native-progress";

const { width: screenWidth } = Dimensions.get("window");

const InfoScreenArtist = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const { type, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState(false);
  const [relatedArtists, setRelatedArtists] = useState(false);
  const [artistTopTracks, setArtistTopTracks] = useState(false);

  useEffect(async () => {
    setArtist(await callGetInfo(type, id, token));
    if (type == "artist") {
      setArtistTopTracks(await callGetArtistTopTracks(id, token)); // Array
      setArtistAlbums(await callGetArtistAlbums(id, token)); // Array
      setRelatedArtists(await callGetRelatedArtists(id, token)); // Array
    }
    setLoading(false);
  }, []);

  const imageUrl = getImageUrl(artist);

  const activePopularityIcons = Math.round(artist.popularity / 10);
  const inactivePopularityIcons = 10 - activePopularityIcons;

  return (
    <ScrollView
      style={styles.infoPageContainer}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {loading ? (
        loadingIcon()
      ) : (
        <>
          {renderImage(imageUrl, navigation)}
          <View style={styles.infoPageTextContainer}>
            <View>
              <Text style={styles.artistSubheader}>{artist.name}</Text>
              <Text style={styles.artistFollowers}>
                {artist.followers.total.toLocaleString()} Followers
              </Text>
            </View>
            <Gallery
              title={`${artist.name}'s Top Tracks`}
              data={artistTopTracks}
            />
            {artistAlbums.length > 0 ? (
              <Gallery
                title={`${artist.name}'s Top Albums`}
                data={artistAlbums}
              />
            ) : null}
            <Gallery
              title={`Artists Like ${artist.name}`}
              data={relatedArtists}
            />
            {renderPopularity(activePopularityIcons, inactivePopularityIcons)}
            {renderGenres(artist.genres)}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export const renderImage = (imageUrl, navigation) => {
  return (
    <ImageBackground style={styles.infoImage} source={{ uri: imageUrl }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={50}
          // color={CustomColors.dark.primaryColor}
          color="#FFF"
          style={{
            position: "absolute",
            top: 50,
            left: 10,
          }}
        />
      </Pressable>
    </ImageBackground>
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
      <Text
        style={{
          marginTop: 200,
          fontSize: 25,
          marginBottom: 30,
          fontWeight: "700",
        }}
      >
        Loading
      </Text>
      <Progress.CircleSnail
        hidesWhenStopped={true}
        size={200}
        thickness={5}
        color={CustomColors.dark.primaryColor}
      />
    </View>
  );
};

export const renderPopularity = (
  activePopularityIcons,
  inactivePopularityIcons
) => {
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

const renderGenres = (genreList) => {
  return (
    <View>
      <Text style={styles.pageSubHeader}>Genres</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={genreList}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.genreContainer}>
              <Text style={styles.genreText}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
      />
    </View>
  );
};

export default InfoScreenArtist;
