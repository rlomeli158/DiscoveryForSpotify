import { TextInput, Image, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import Gallery from "../components/Gallery/Gallery";
import { useEffect, useState } from "react";
import {
  callGetCurrentUser,
  callGetNewReleases,
  callGetPlaylists,
  callGetTopPlaylists,
  callGetUsersTop,
  callRecentlyPlayed,
  callSearchApi,
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
import SearchResult from "../components/Discover/SearchResults";
import {
  setPlayingSound,
  setSoundSource,
} from "../redux/features/playingSound";

const name = "Steve";

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const HomeScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const currentUser = useSelector((state) => state.currentUser.user);
  const playingSound = useSelector((state) => state.playingSound.value);
  const dispatch = useDispatch();

  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [playlists, setPlaylists] = useState(false);
  const [newReleases, setNewReleases] = useState();
  const [topPlaylists, setTopPlaylists] = useState();

  const [loading, setLoading] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [currentlySearching, setCurrentlySearching] = useState(false);
  const [text, setText] = useState("");
  const [artistData, setArtistData] = useState([]);

  useEffect(async () => {
    setTopArtists(await callGetUsersTop("artists", "short_term", token));
    setTopTracks(await callGetUsersTop("tracks", "short_term", token));
    setRecentlyPlayed(await callRecentlyPlayed(token));
    setPlaylists(await callGetPlaylists(token));
    dispatch(setCurrentUser(await callGetCurrentUser(token)));
    setLoading(false);
  }, []);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.country) {
        setNewReleases(await callGetNewReleases(currentUser.country, token));
        setTopPlaylists(await callGetTopPlaylists(currentUser.country, token));
      }
    }
  }, [currentUser]);

  useEffect(async () => {
    await navigation.addListener("blur", async () => {
      setText("");
      setArtistData([]);
      setCurrentlySearching(false);
      if (playingSound != false) {
        await playingSound.stopAsync();
        dispatch(setPlayingSound(false));
        dispatch(setSoundSource(""));
      }
    });
  }, [navigation, playingSound]);

  const renderSearch = () => {
    return (
      <>
        <View style={[styles.discoverInput, { marginTop: 0 }]}>
          <View
            style={[
              styles.discoverTextBox,
              {
                borderColor: isFocused
                  ? CustomColors.dark.primaryColor
                  : CustomColors.dark.primaryText,
              },
            ]}
          >
            <Pressable
              onPress={() => {
                setCurrentlySearching(false);
              }}
            >
              <Image
                source={require("../assets/images/DiscoveryLogoWhite.png")}
                style={{ height: 30, width: 30, marginRight: 8 }}
              />
            </Pressable>
            <TextInput
              autoCorrect={false}
              onChangeText={async (newText) => {
                if (newText === "") {
                  setArtistData([]);
                  setText("");
                } else {
                  setText(newText);
                  try {
                    const results = await callSearchApi(newText, token);
                    setArtistData(results);
                  } catch (err) {
                    console.log(err);
                  }
                }
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              style={styles.placeholderStyle}
              placeholder={"Search..."}
              placeholderTextColor={CustomColors.dark.placeholderColor}
              value={text}
            />
          </View>
        </View>
        {artistData ? renderSearchResults(artistData) : null}
      </>
    );
  };

  return (
    <ScrollView
      style={[styles.pageContainer]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {loading ? (
        loadingIcon()
      ) : (
        <>
          {currentlySearching ? (
            renderSearch()
          ) : (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable
                onPress={() => {
                  setCurrentlySearching(true);
                }}
              >
                <Image
                  source={require("../assets/images/DiscoveryLogoWhite.png")}
                  style={{ height: 30, width: 30, marginLeft: 5 }}
                />
              </Pressable>
              <Text style={styles.pageHeader}>Today's Overview</Text>
              <Pressable
                onPress={async () => {
                  await SecureStore.setItemAsync("ACCESS_TOKEN", "");
                  await SecureStore.setItemAsync("REFRESH_TOKEN", "");
                  await SecureStore.setItemAsync("EXPIRATION_TIME", "");
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
          )}

          <View>
            <Gallery title="Your Top Artists" data={topArtists} isTop={true} />
            <Gallery title="Your Top Songs" data={topTracks} isTop={true} />
            <Gallery title="Your Playlists" data={playlists} />
            <Gallery title="New Releases" data={newReleases} />
            <Gallery title="Popular Playlists" data={topPlaylists} />
            <VerticalList title="Your Recently Played" data={recentlyPlayed} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const renderSearchResults = (artistData) => {
  return <SearchResult artistData={artistData} needsOnClick={true} />;
};

export default HomeScreen;
