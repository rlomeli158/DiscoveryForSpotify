import { useEffect, useState } from "react";
import { Pressable, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
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
import { playTrack, stopTrack } from "../components/Carousel/InfoAndPlayer";
import * as Progress from "react-native-progress";
import { loadingIcon, renderPopularity } from "./InfoScreenArtist";

const InfoScreenTrack = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const { type, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState(false);
  const [recommendedTracks, setRecommendedTracks] = useState(false);
  const [saveStatus, setSavedStatus] = useState("");
  const [sound, setSound] = useState(false);

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
      await callGetRecommendationsApi([currentTrack], 10, token)
    );
    // Check if song is in liked
    setSavedStatus(await callCheckTrackSaveStatus(id, token));

    setLoading(false);
  }, []);

  const imageUrl = getImageUrl(track);

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
          <Image style={styles.infoImage} source={{ uri: imageUrl }} />
          <View style={styles.infoPageTextContainer}>
            <View style={{ flexDirection: "row" }}>
              {renderSongInfo(track.name, track.artists, duration)}
            </View>
            {renderInteractions(
              track,
              sound,
              setSound,
              saveStatus,
              setSavedStatus,
              token
            )}
            {renderRecommendedTracks(recommendedTracks)}
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

const renderInteractions = (
  track,
  sound,
  setSound,
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
          flexDirection: "row",
          margin: 10,
        })
      }
    >
      <FontAwesome
        style={{ marginHorizontal: 5 }}
        name="comment-o"
        size={50}
        color="white"
      />
      {track.preview_url ? (
        sound ? (
          <Pressable
            onPress={() => {
              stopTrack(sound, setSound);
            }}
          >
            <FontAwesome
              style={{ marginHorizontal: 5 }}
              name="pause-circle"
              size={50}
              color="white"
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              playTrack(track.preview_url, setSound);
            }}
          >
            <FontAwesome
              style={{ marginHorizontal: 5 }}
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
            style={{ marginHorizontal: 5 }}
            name="heart"
            size={50}
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
            style={{ marginHorizontal: 5 }}
            name="heart-o"
            size={50}
            color="white"
          />
        </Pressable>
      )}
    </View>
  );
};

const renderRecommendedTracks = (recommendedTracks) => {
  return <Gallery title="Tracks Like This" data={recommendedTracks} />;
};

const renderAudioFeatures = (audioFeatures) => {
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
