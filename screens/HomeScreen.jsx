import { Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import Gallery from "../components/Gallery/Gallery";
import { useEffect, useState } from "react";
import {
  callGetCurrentUser,
  callGetPlaylists,
  callGetUsersTop,
  callRecentlyPlayed,
} from "../client/spotifyClient";
import { useSelector, useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
import VerticalList from "../components/VerticalList/VerticalList";
import { loadingIcon } from "./InfoScreenArtist";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import CustomColors from "../constants/Colors";
import { getTokens } from "../client/authenticationClient";
import { setCurrentUser } from "../redux/features/currentUser";

const name = "Steve";

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const HomeScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [playlists, setPlaylists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setTopArtists(await callGetUsersTop("artists", "short_term", token));
    setTopTracks(await callGetUsersTop("tracks", "short_term", token));
    setRecentlyPlayed(await callRecentlyPlayed(token));
    setPlaylists(await callGetPlaylists(token));
    dispatch(setCurrentUser(await callGetCurrentUser(token)));
    setLoading(false);
  }, []);

  return (
    <ScrollView
      style={[styles.pageContainer]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {loading ? (
        loadingIcon()
      ) : (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.pageHeader}>Welcome back, {name}</Text>
            <Pressable
              onPress={async () => {
                await SecureStore.setItemAsync("ACCESS_TOKEN", "");
                await SecureStore.setItemAsync("REFRESH_TOKEN", "");
                await SecureStore.setItemAsync("EXPIRATION_TIME", "");
                // setSignedOut(true);
                navigation.push("Root", {
                  screen: "LogInScreen",
                });
              }}
            >
              <Ionicons
                name="exit-outline"
                size={30}
                color={CustomColors.dark.primaryColor}
              />
            </Pressable>
          </View>
          <View>
            <Gallery title="Your Top Artists" data={topArtists} isTop={true} />
            <Gallery title="Your Top Songs" data={topTracks} isTop={true} />
            <Gallery title="Your Playlists" data={playlists} />
            <VerticalList title="Your Recently Played" data={recentlyPlayed} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
