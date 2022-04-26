import { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { callGetUsersTop } from "../client/spotifyClient";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import { loadingIcon } from "./InfoScreenArtist";
import { useSelector } from "react-redux";
import Grid from "../components/Grid/Grid";
import CustomColors from "../constants/Colors";

const TopScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const [loading, setLoading] = useState(true);
  const [tracksTabSelected, setTracksTabSelected] = useState(true);
  const [topTracks, setTopTracks] = useState(false);
  const [topArtists, setTopArtists] = useState(false);
  const [term, setTerm] = useState("short_term");

  useEffect(async () => {
    setTopArtists(await callGetUsersTop("artists", term, token));
    setTopTracks(await callGetUsersTop("tracks", term, token));
    setLoading(false);
  }, []);

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text style={[styles.pageHeader, { alignSelf: "center" }]}>
        Your Top Stuff
      </Text>
      {renderTabs(tracksTabSelected, setTracksTabSelected)}
      <View>
        {loading ? (
          loadingIcon()
        ) : tracksTabSelected ? (
          <Grid data={topTracks} />
        ) : (
          <Grid data={topArtists} />
        )}
      </View>
    </ScrollView>
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

export default TopScreen;
