import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Image } from "react-native";
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
import { AntDesign } from "@expo/vector-icons";
import CustomColors from "../constants/Colors";

const { width: screenWidth } = Dimensions.get("window");

const InfoScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const { type, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState(false);
  const [relatedArtists, setRelatedArtists] = useState(false);
  const [artistTopTracks, setArtistTopTracks] = useState(false);

  useEffect(async () => {
    setInfo(await callGetInfo(type, id, token));
    if (type == "artist") {
      setArtistTopTracks(await callGetArtistTopTracks(id, token)); // Array
      setArtistAlbums(await callGetArtistAlbums(id, token)); // Array
      setRelatedArtists(await callGetRelatedArtists(id, token)); // Array
    }
    setLoading(false);
  }, []);

  const imageUrl = getImageUrl(info);

  const activePopularityIcons = Math.round(info.popularity / 10);
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
              <Text style={styles.artistSubheader}>{info.name}</Text>
              <Text style={styles.artistFollowers}>
                {info.followers.total.toLocaleString()} Followers
              </Text>
            </View>
            <Gallery
              title={`${info.name}'s Top Tracks`}
              data={artistTopTracks}
            />
            <Gallery title={`${info.name}'s Top Albums`} data={artistAlbums} />
            <Gallery
              title={`Artists Like ${info.name}`}
              data={relatedArtists}
            />
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

export default InfoScreen;
