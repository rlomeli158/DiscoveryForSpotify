import {
  ImageBackground,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import Gallery from "../components/Gallery/Gallery";
import { useEffect, useRef, useState } from "react";
import {
  callGetCurrentlyPlaying,
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
import { checkIfExpired, getTokens } from "../client/authenticationClient";
import { setCurrentUser } from "../redux/features/currentUser";
import SearchResult from "../components/Discover/SearchResults";
import {
  setPlayingSound,
  setSoundSource,
} from "../redux/features/playingSound";
import CurrentlyPlaying from "../components/currentlyPlaying";
import { useIsFocused } from "@react-navigation/native";

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

const HomeScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const currentUser = useSelector((state) => state.currentUser.user);
  const playingSound = useSelector((state) => state.playingSound.value);
  const dispatch = useDispatch();
  const focus = useIsFocused();

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState();

  const [loading, setLoading] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [currentlySearching, setCurrentlySearching] = useState(false);
  const [text, setText] = useState("");
  const [artistData, setArtistData] = useState([]);

  useEffect(async () => {
    await getTokens(() => {}, dispatch);
    setTopArtists(await callGetUsersTop("artists", "short_term", token));
    setTopTracks(await callGetUsersTop("tracks", "short_term", token));
    setRecentlyPlayed(await callRecentlyPlayed(token));
    setCurrentlyPlaying(await callGetCurrentlyPlaying(token));
    setPlaylists(await callGetPlaylists(token));
    dispatch(setCurrentUser(await callGetCurrentUser(token)));
    setLoading(false);
  }, []);

  // console.log("PLAYED", recentlyPlayed);

  // useEffect(async () => {
  //   if (focus) {
  //     console.log("called!");
  //     setCurrentlyPlaying(await callGetCurrentlyPlaying(token));
  //   } else {
  //     console.log("not focused");
  //   }
  // }, []);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.country) {
        setNewReleases(await callGetNewReleases(currentUser.country, token));
        setTopPlaylists(await callGetTopPlaylists(currentUser.country, token));
        // setLoading(false);
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
                borderColor: isFocused ? "#FFF" : "#313131",
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
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require(".././assets/images/blackCircularGradient.png")}
    >
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  onPress={() => {
                    setCurrentlySearching(true);
                  }}
                >
                  <Image
                    source={require("../assets/images/DiscoveryLogoWhite.png")}
                    style={{ height: 35, width: 35, marginLeft: 5 }}
                  />
                </Pressable>
                <Text style={styles.pageHeader}>Overview</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Root", {
                      screen: "LogInScreen",
                      params: {
                        signedOut: true,
                      },
                    });
                    SecureStore.setItemAsync("ACCESS_TOKEN", "");
                    SecureStore.setItemAsync("REFRESH_TOKEN", "");
                    SecureStore.setItemAsync("EXPIRATION_TIME", "");
                  }}
                >
                  <Ionicons
                    name="exit-outline"
                    size={35}
                    color={CustomColors.dark.primaryColor}
                  />
                </Pressable>
              </View>
            )}

            <View>
              {/* {currentlyPlaying ? (
                <VerticalList
                  title="Currently Playing"
                  data={[currentlyPlaying]}
                  isCurrentlyPlaying={true}
                />
              ) : null} */}

              {topArtists?.length > 0 ? (
                <Gallery
                  title="Your Top Artists"
                  data={topArtists}
                  isTop={true}
                />
              ) : null}

              {topTracks?.length > 0 ? (
                <Gallery title="Your Top Songs" data={topTracks} isTop={true} />
              ) : null}

              {playlists?.length > 0 ? (
                <Gallery title="Your Playlists" data={playlists} />
              ) : null}

              {newReleases ? (
                <Gallery title="New Releases" data={newReleases} />
              ) : null}

              {topPlaylists ? (
                <Gallery title="Popular Playlists" data={topPlaylists} />
              ) : null}

              {recentlyPlayed ? (
                <VerticalList
                  title="Your Recently Played"
                  data={recentlyPlayed}
                />
              ) : null}
            </View>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const renderSearchResults = (artistData) => {
  return <SearchResult artistData={artistData} needsOnClick={true} />;
};

export default HomeScreen;
