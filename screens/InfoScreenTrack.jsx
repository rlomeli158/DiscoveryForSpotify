import { useEffect, useState } from "react";
import { Pressable, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  callCheckTrackSaveStatus,
  callDeleteTrack,
  callGetInfo,
  callGetRecommendationsApi,
  callGetTrackFeatures,
  callSaveTrack,
} from "../client/spotifyClient";
import Gallery, {
  breakUpArtistArray,
  getImageUrl,
} from "../components/Gallery/Gallery";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import CustomColors from "../constants/Colors";
import * as Progress from "react-native-progress";
import { loadingIcon, renderImage, renderPopularity } from "./InfoScreenArtist";
import {
  setPlayingSound,
  setSoundSource,
} from "../redux/features/playingSound";
import { Audio } from "expo-av";
import { openTray } from "../redux/features/commentsTray";

const InfoScreenTrack = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const playingSound = useSelector((state) => state.playingSound.value);
  const dispatch = useDispatch();

  const { type, id } = route.params;

  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState(false);
  const [recommendedTracks, setRecommendedTracks] = useState(false);
  const [artist, setArtist] = useState(false);
  const [saveStatus, setSavedStatus] = useState("");

  useEffect(async () => {
    setTrack(await callGetInfo(type, id, token));
    // Get audio features
    setAudioFeatures(await callGetTrackFeatures(id, token));
    const currentTrack = {
      type: "track",
      id: id,
    };
    // Tracks like this
    setRecommendedTracks(
      await callGetRecommendationsApi([currentTrack], 10, {}, token)
    );
    // Check if song is in liked
    setSavedStatus(await callCheckTrackSaveStatus(id, token));

    setLoading(false);
  }, []);

  useEffect(async () => {
    if (track) {
      setArtist(await callGetInfo("artist", track.artists[0].id, token));
    }
  }, [track]);

  useEffect(async () => {
    await navigation.addListener("blur", async () => {
      if (playingSound != false) {
        await playingSound.stopAsync();
        dispatch(setPlayingSound(false));
        dispatch(setSoundSource(""));
      }
    });
  }, [navigation, playingSound]);

  const imageUrl = getImageUrl(track);
  const artistImageUrl = getImageUrl(artist);

  // Popularity
  const activePopularityIcons = Math.round(track.popularity / 10);
  const inactivePopularityIcons = 10 - activePopularityIcons;

  // Duration
  const duration = new Date(track.duration_ms);

  return (
    <ScrollView
      style={styles.infoPageContainer}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {loading ? (
        loadingIcon()
      ) : (
        <>
          {renderImage(imageUrl, navigation)}
          <View style={styles.infoPageTextContainer}>
            <View style={{ flexDirection: "row" }}>
              {renderSongInfo(track.name, track.artists, duration)}
            </View>
            {renderInteractions(
              track,
              playingSound,
              dispatch,
              saveStatus,
              setSavedStatus,
              token
            )}
            {renderRecommendedTracks(recommendedTracks)}
            {renderAlbum(
              track.album,
              imageUrl,
              artist,
              artistImageUrl,
              navigation
            )}
            {renderAudioFeatures(audioFeatures)}
            {renderPopularity(activePopularityIcons, inactivePopularityIcons)}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const renderSongInfo = (songName, artists, duration) => {
  const artistString = breakUpArtistArray(artists);

  const currentSeconds = duration.getSeconds();
  let formattedSeconds = currentSeconds;
  if (currentSeconds < 10) {
    formattedSeconds = "0" + duration.getSeconds();
  }

  return (
    <View style={{ flexDirection: "column", width: "100%" }}>
      <Text style={styles.songNameInfoPage}>{songName}</Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.artistNameInfoPage}>{artistString}</Text>
        <Text
          style={{
            color: CustomColors.dark.primaryColor,
          }}
        >
          {`${duration.getMinutes()}:${formattedSeconds}`}
        </Text>
      </View>
    </View>
  );
};

export const renderInteractions = (
  track,
  playingSound,
  dispatch,
  saveStatus,
  setSavedStatus,
  token
) => {
  return (
    <View
      style={
        ([styles.playContainer],
        {
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row",
          margin: 10,
        })
      }
    >
      <Pressable
        onPress={() => {
          dispatch(openTray(track));
        }}
      >
        <FontAwesome
          style={{ marginHorizontal: 10 }}
          name="comment-o"
          size={35}
          color="white"
        />
      </Pressable>
      {track.preview_url || track.album.preview_url ? (
        playingSound ? (
          <Pressable
            onPress={() => {
              stopTrack(playingSound, dispatch);
            }}
          >
            <FontAwesome
              style={{ marginHorizontal: 10 }}
              name="pause-circle"
              size={50}
              color="white"
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              playTrack(
                track.preview_url ? track.preview_url : track.album.preview_url,
                dispatch
              );
            }}
          >
            <FontAwesome
              style={{ marginHorizontal: 10 }}
              name="play-circle"
              size={50}
              color="white"
            />
          </Pressable>
        )
      ) : null}
      {saveStatus ? (
        <Pressable
          onPress={async () => {
            await callDeleteTrack(track.id, token);
            setSavedStatus(await callCheckTrackSaveStatus(track.id, token));
          }}
        >
          <FontAwesome
            style={{ marginHorizontal: 10 }}
            name="heart"
            size={35}
            color="white"
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={async () => {
            await callSaveTrack(track.id, token);
            setSavedStatus(await callCheckTrackSaveStatus(track.id, token));
          }}
        >
          <FontAwesome
            style={{
              marginHorizontal: 10,
            }}
            name="heart-o"
            size={35}
            color="white"
          />
        </Pressable>
      )}
    </View>
  );
};

export const playTrack = async (link, dispatch) => {
  const source = { uri: link };

  const { sound } = await Audio.Sound.createAsync(source);
  dispatch(setPlayingSound(sound));
  dispatch(setSoundSource(link));

  await sound.playAsync();
};

export const stopTrack = async (playingSound, dispatch) => {
  if (playingSound) {
    await playingSound.stopAsync();
    dispatch(setPlayingSound(false));
    dispatch(setSoundSource(""));
  }
};

const renderRecommendedTracks = (recommendedTracks) => {
  return <Gallery title="Tracks Like This" data={recommendedTracks} />;
};

const renderAlbum = (album, imageUrl, artist, artistImage, navigation) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "50%" }}>
        <Text style={styles.pageSubHeader}>Artist</Text>
        <Pressable
          onPress={() => {
            navigation.push("InfoScreenArtist", {
              type: "artist",
              id: artist.id,
            });
          }}
        >
          <Image style={styles.galleryImage} source={{ uri: artistImage }} />
          <Text style={{ paddingTop: 10 }}>{artist.name}</Text>
        </Pressable>
      </View>
      {album.album_type == "album" ? (
        <View style={{ width: "50%" }}>
          <Text style={styles.pageSubHeader}>Album</Text>
          <Pressable
            onPress={() => {
              navigation.push("InfoScreenAlbum", {
                id: album.id,
              });
            }}
          >
            <Image style={styles.galleryImage} source={{ uri: imageUrl }} />
            <Text style={{ paddingTop: 10 }}>{album.name}</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
  if (album.album_type == "album") {
    return (
      <View style={{ width: "50%" }}>
        <Text style={styles.pageSubHeader}>Album</Text>
        <Pressable
          onPress={() => {
            navigation.push("InfoScreenAlbum", {
              id: album.id,
            });
          }}
        >
          <Image style={styles.galleryImage} source={{ uri: imageUrl }} />
          <Text style={{ paddingTop: 10 }}>{album.name}</Text>
        </Pressable>
      </View>
    );
  }
};

export const renderAudioFeatures = (audioFeatures) => {
  return (
    <View>
      <Text style={styles.pageSubHeader}>Key Features</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <AudioFeatureBar
          featureName="Acousticness"
          stat={audioFeatures.acousticness}
        />
        <AudioFeatureBar
          featureName="Danceability"
          stat={audioFeatures.danceability}
        />
        <AudioFeatureBar featureName="Energy" stat={audioFeatures.energy} />
        <AudioFeatureBar featureName="Happiness" stat={audioFeatures.valence} />
      </View>
    </View>
  );
};

const AudioFeatureBar = ({ featureName, stat }) => {
  return (
    <View style={{ width: "47%", margin: 5 }}>
      <Text>{featureName}</Text>
      <Progress.Bar
        color={CustomColors.dark.primaryColor}
        progress={stat}
        borderWidth={2}
        height={15}
        width={null}
      />
    </View>
  );
};

export default InfoScreenTrack;
