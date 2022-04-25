import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { callGetUsersTop } from "../client/spotifyClient";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import token from "../redux/features/token";
import { loadingIcon } from "./InfoScreenArtist";
import { useSelector } from "react-redux";
import Grid from "../components/Grid/Grid";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { Dimensions } from "react-native";
import CustomColors from "../constants/Colors";

const RenderTracks = () => {
  const token = useSelector((state) => state.token.value);
  const [loading, setLoading] = useState(true);
  const [topTracks, setTopTracks] = useState(false);
  const [term, setTerm] = useState("short_term");

  useEffect(async () => {
    setTopTracks(await callGetUsersTop("tracks", term, token));

    setLoading(false);
  }, []);
  return <View>{loading ? loadingIcon() : <Grid data={topTracks} />}</View>;
};

const RenderArtists = () => {
  const token = useSelector((state) => state.token.value);
  const [loading, setLoading] = useState(true);
  const [topArtists, setTopArtists] = useState(false);
  const [term, setTerm] = useState("short_term");

  useEffect(async () => {
    setTopArtists(await callGetUsersTop("artists", term, token));

    setLoading(false);
  }, []);
  return <View>{loading ? loadingIcon() : <Grid data={topArtists} />}</View>;
};

const renderScene = SceneMap({
  tracks: RenderTracks,
  artists: RenderArtists,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: CustomColors.dark.background }}
    labelStyle={{
      textTransform: "capitalize",
      fontSize: 20,
      fontWeight: "700",
    }}
  />
);

const TopScreen = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tracks", title: "Tracks" },
    { key: "artists", title: "Artists" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      //   style={[styles.pageContainer, {}]}
      style={{
        paddingTop: 50,
        backgroundColor: CustomColors.dark.background,
        paddingHorizontal: 10,
      }}
      renderTabBar={renderTabBar}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

export default TopScreen;
