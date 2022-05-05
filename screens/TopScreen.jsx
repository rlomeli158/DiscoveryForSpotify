import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView } from "react-native";
import { callGetUsersTop } from "../client/spotifyClient";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import { loadingIcon } from "./InfoScreenArtist";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../components/Grid/Grid";
import CustomColors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getTokens } from "../client/authenticationClient";

const TopScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const [loading, setLoading] = useState(true);
  const [tracksTabSelected, setTracksTabSelected] = useState(true);
  const [topTracks, setTopTracks] = useState(false);
  const [topArtists, setTopArtists] = useState(false);
  const possibleTerms = ["short_term", "medium_term", "long_term"];
  const [termIndex, setTermIndex] = useState(0);
  const [size, setSize] = useState("medium");

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      if (route.params.tab == "artists") {
        setTracksTabSelected(false);
      } else {
        setTracksTabSelected(true);
      }
    }
  }, [route.params]);

  useEffect(async () => {
    setLoading(true);
    await getTokens(() => {}, dispatch);
    setTopArtists(
      await callGetUsersTop("artists", possibleTerms[termIndex], token)
    );
    setTopTracks(
      await callGetUsersTop("tracks", possibleTerms[termIndex], token)
    );
    setLoading(false);
  }, [termIndex]);

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require(".././assets/images/blackCircularGradient.png")}
    >
      <ScrollView
        style={styles.pageContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderTopBar(
          termIndex,
          setTermIndex,
          size,
          setSize,
          tracksTabSelected,
          possibleTerms
        )}
        {renderTabs(tracksTabSelected, setTracksTabSelected)}
        <View>
          {loading ? (
            loadingIcon()
          ) : tracksTabSelected ? (
            <Grid data={topTracks} size={size} />
          ) : (
            <Grid data={topArtists} size={size} />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const renderTabs = (tracksTabSelected, setTracksTabSelected) => {
  return (
    <View style={styles.tabContainer}>
      <Pressable
        onPress={() => {
          setTracksTabSelected(true);
        }}
        style={[
          styles.tab,
          {
            borderBottomColor: tracksTabSelected
              ? "#FFF"
              : CustomColors.dark.formBackground,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.tabText,
              {
                color: tracksTabSelected
                  ? "#FFF"
                  : CustomColors.dark.formBackground,
              },
            ]}
          >
            Tracks
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          setTracksTabSelected(false);
        }}
        style={[
          styles.tab,
          {
            borderBottomColor: tracksTabSelected
              ? CustomColors.dark.formBackground
              : "#FFF",
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.tabText,
              {
                color: tracksTabSelected
                  ? CustomColors.dark.formBackground
                  : "#FFF",
              },
            ]}
          >
            Artists
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const renderHeaderText = (tracksTabSelected, possibleTerms, termIndex) => {
  const currentTerm = possibleTerms[termIndex];
  let term = "4 weeks";
  if (currentTerm == "medium_term") {
    term = "6 months";
  } else if (currentTerm == "long_term") {
    term = "All time";
  }

  return (
    <View>
      <Text style={styles.topText}>{`Your Top ${
        tracksTabSelected ? "Tracks" : "Artists"
      }`}</Text>
      <Text style={styles.textTime}>{`${term}`}</Text>
    </View>
  );
};

const renderTopBar = (
  termIndex,
  setTermIndex,
  size,
  setSize,
  tracksTabSelected,
  possibleTerms
) => {
  return (
    <View style={styles.topItemsBar}>
      <View>
        <Pressable
          onPress={() => {
            if (termIndex < 2) {
              setTermIndex(termIndex + 1);
            } else {
              setTermIndex(0);
            }
          }}
        >
          <FontAwesome
            name="calendar-o"
            size={30}
            color={CustomColors.dark.primaryColor}
          />
        </Pressable>
      </View>
      {renderHeaderText(tracksTabSelected, possibleTerms, termIndex)}
      <View>
        <Pressable
          onPress={() => {
            if (size == "small") {
              setSize("large");
            } else {
              setSize("small");
            }
          }}
        >
          <Ionicons
            name="grid-outline"
            size={30}
            color={CustomColors.dark.primaryColor}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TopScreen;
