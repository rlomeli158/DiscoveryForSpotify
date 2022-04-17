import { Button, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import Gallery from "../components/Gallery/Gallery";
import { useEffect, useState } from "react";
import { callGetUsersTop, callRecentlyPlayed } from "../client/spotifyClient";
import { useSelector, useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();
import { setToken } from "../redux/features/token";

const name = "Steve";
const data = [
  {
    album: {
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
        },
      ],
    },
    artists: [
      {
        name: "Steve Lomeli",
      },
    ],
    name: "This Is A Crazy Long Name",
  },
  {
    album: {
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
        },
      ],
    },
    artists: [
      {
        name: "Steve Lomeli",
      },
    ],
    name: "Best Song Ever",
  },
  {
    album: {
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
        },
      ],
    },
    artists: [
      {
        name: "Steve Lomeli",
      },
    ],
    name: "Best Song Ever Pt. 2",
  },
  {
    album: {
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
        },
      ],
    },
    artists: [
      {
        name: "Steve Lomeli",
      },
    ],
    name: "Best Song Ever Pt. 4",
  },
  {
    album: {
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
        },
      ],
    },
    artists: [
      {
        name: "Steve Lomeli",
      },
    ],
    name: "Best Song Ever Pt. 3",
  },
];

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const HomeScreen = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [tokenReceived, setTokenReceived] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "4f0fe728346848b691b85459ebeadb89",
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-read-recently-played",
        "user-top-read",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "myapp",
        preferLocalhost: true,
        isTripleSlashed: true,
      }),
    },
    discovery
  );

  useEffect(async () => {
    if (!token && request) {
      promptAsync();
    }
  }, [request]);

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      dispatch(setToken(access_token));
      setTokenReceived(true);
    }
  }, [response]);

  useEffect(async () => {
    setTopArtists(await callGetUsersTop("artists", token));
    setTopTracks(await callGetUsersTop("tracks", token));
    setRecentlyPlayed(await callRecentlyPlayed(token));
  }, [tokenReceived]);

  return (
    <ScrollView
      style={[styles.pageContainer]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <Text style={styles.pageHeader}>Welcome back, {name}</Text>
      </View>
      <View>
        <Gallery title="Your Top Artists" data={topArtists} />
        <Gallery title="Your Top Songs" data={topTracks} />
        <Gallery title="Your Recently Played" data={recentlyPlayed} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
