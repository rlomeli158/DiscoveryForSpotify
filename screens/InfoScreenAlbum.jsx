import { useEffect, useState } from "react";
import { ImageBackground, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTokens } from "../client/authenticationClient";
import {
  callGetAlbumInfo,
  callGetMultipleTracksFeatures,
} from "../client/spotifyClient";
import { breakUpArtistArray, getImageUrl } from "../components/Gallery/Gallery";
import OpenInSpotify from "../components/openInSpotify";
import { Text, View } from "../components/Themed";
import VerticalList from "../components/VerticalList/VerticalList";
import styles from "../constants/styles";
import {
  setPlayingSound,
  setSoundSource,
} from "../redux/features/playingSound";
import { loadingIcon, renderImage, renderPopularity } from "./InfoScreenArtist";
import { renderAudioFeatures } from "./InfoScreenTrack";

const InfoScreenAlbum = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const playingSound = useSelector((state) => state.playingSound.value);
  const dispatch = useDispatch();

  const { id } = route.params;

  const [albumInfo, setAlbumInfo] = useState(false);
  const [albumAudioFeatures, setAlbumAudioFeatures] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await getTokens(() => {}, dispatch);
    setAlbumInfo(await callGetAlbumInfo(id, token));
    setLoading(false);
  }, []);

  useEffect(async () => {
    if (albumInfo) {
      const trackIds = getTracksIds(albumInfo.tracks.items);
      setAlbumAudioFeatures(
        await callGetMultipleTracksFeatures(trackIds, token)
      );
    }
  }, [albumInfo]);

  useEffect(async () => {
    await navigation.addListener("blur", async () => {
      if (playingSound != false) {
        await playingSound.stopAsync();
        dispatch(setPlayingSound(false));
        dispatch(setSoundSource(""));
      }
    });
  }, [navigation, playingSound]);

  const imageUrl = getImageUrl(albumInfo);

  // Popularity
  const activePopularityIcons = Math.round(albumInfo.popularity / 10);
  const inactivePopularityIcons = 10 - activePopularityIcons;

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require(".././assets/images/blackCircularGradient.png")}
    >
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
              {renderAlbumInfo(albumInfo)}
              {renderPopularity(activePopularityIcons, inactivePopularityIcons)}
              {renderAudioFeatures(albumAudioFeatures)}
              {OpenInSpotify(albumInfo.external_urls.spotify)}
              {renderTracks(albumInfo.tracks, imageUrl)}
            </View>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const renderAlbumInfo = (albumInfo) => {
  const artistString = breakUpArtistArray(albumInfo.artists);
  return (
    <View style={{ flexDirection: "column", width: "100%" }}>
      <Text style={styles.songNameInfoPage}>{albumInfo.name}</Text>
      <Text style={styles.artistNameInfoPage}>{artistString}</Text>
    </View>
  );
};

const renderTracks = (tracks, imageUrl) => {
  return (
    <View>
      <VerticalList
        title="Tracks"
        data={tracks.items}
        albumImage={imageUrl}
        numberOfTracks={tracks.total}
      />
    </View>
  );
};

export const getTracksIds = (tracks) => {
  let trackIds = "";
  tracks.forEach((track) => {
    if (track.added_at) {
      track = track.track;
    }
    trackIds += track.id + ",";
  });

  trackIds = trackIds.slice(0, -1);
  return trackIds;
};

export default InfoScreenAlbum;
