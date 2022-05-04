import { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  callGetPlaylistInfo,
  callGetMultipleTracksFeatures,
} from "../client/spotifyClient";
import { getImageUrl } from "../components/Gallery/Gallery";
import { Text, View } from "../components/Themed";
import VerticalList from "../components/VerticalList/VerticalList";
import styles from "../constants/styles";
import {
  setPlayingSound,
  setSoundSource,
} from "../redux/features/playingSound";
import { getTracksIds } from "./InfoScreenAlbum";
import { loadingIcon, renderImage } from "./InfoScreenArtist";
import { renderAudioFeatures } from "./InfoScreenTrack";

const InfoScreenPlaylist = ({ route, navigation }) => {
  const playingSound = useSelector((state) => state.playingSound.value);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const { playlist } = route.params;

  const [playlistInfo, setPlaylistInfo] = useState(false);
  const [playlistAudioFeatures, setPlaylistAudioFeatures] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setPlaylistInfo(await callGetPlaylistInfo(playlist.id, token));
    setLoading(false);
  }, []);

  useEffect(async () => {
    if (playlistInfo) {
      const trackIds = getTracksIds(playlistInfo.tracks.items);
      setPlaylistAudioFeatures(
        await callGetMultipleTracksFeatures(trackIds, token)
      );
    }
  }, [playlistInfo]);

  useEffect(async () => {
    await navigation.addListener("blur", async () => {
      if (playingSound != false) {
        await playingSound.stopAsync();
        dispatch(setPlayingSound(false));
        dispatch(setSoundSource(""));
      }
    });
  }, [navigation, playingSound]);

  const imageUrl = getImageUrl(playlist);
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
            {renderPlaylistInfo(playlist)}
            {renderPlaylistDescription(playlist)}
            {renderAudioFeatures(playlistAudioFeatures)}
            {renderTracks(playlistInfo.tracks)}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const renderPlaylistInfo = (playlist) => {
  return (
    <View style={{ flexDirection: "column", width: "100%" }}>
      <Text style={styles.playlistName}>{playlist.name}</Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.artistNameInfoPage}>
          {playlist.owner.display_name}
        </Text>
        <Text style={styles.artistNameInfoPage}>
          {playlist.public
            ? "Public"
            : playlist.public == null
            ? ""
            : "Private"}
        </Text>
      </View>
    </View>
  );
};

const renderPlaylistDescription = (playlist) => {
  if (playlist.description) {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15 }}>{playlist.description}</Text>
      </View>
    );
  }
};

const renderTracks = (tracks) => {
  return (
    <View>
      <VerticalList
        title="Tracks"
        data={tracks.items}
        numberOfTracks={tracks.total}
      />
    </View>
  );
};

export default InfoScreenPlaylist;
