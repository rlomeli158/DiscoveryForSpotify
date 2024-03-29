import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, TextInput, ScrollView } from "react-native";
import { Text, View } from "../Themed";
import CustomColors from "../../constants/Colors";
import SearchResults from "./SearchResults";
import CustomSlider from "../Carousel/Recommendation/CustomCarousel";
import { useNavigation } from "@react-navigation/native";
import styles from "../../constants/styles";
import {
  callSearchApi,
  callGetRecommendationsApi,
  callGetUsersTop,
  callRecentlyPlayed,
} from "../../client/spotifyClient";
import { useSelector, useDispatch } from "react-redux";
import Gallery from "../Gallery/Gallery";
import { Slider } from "@miblanchard/react-native-slider";
import { clearAllItems } from "../../redux/features/selectedItems";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { getTokens } from "../../client/authenticationClient";
import { loadingIcon } from "../../screens/InfoScreenArtist";

const SearchField = ({ onFocus = () => {} }) => {
  const newSelectedItems = useSelector((state) => state.selectedItems.items);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [text, setText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [options, setOptions] = useState(false);

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const [acoustic, setAcoustic] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);
  const [valence, setValence] = useState(0.5);
  const [popularity, setPopularity] = useState(0.5);

  const extraOptions = {
    acoustic: acoustic,
    danceability: danceability,
    energy: energy,
    valence: valence,
    popularity: popularity,
  };

  useEffect(() => {
    setText("");
    setArtistData([]);
  }, [newSelectedItems]);

  useEffect(async () => {
    await getTokens(() => {}, dispatch);
    setTopArtists(await callGetUsersTop("artists", "short_term", token));
    setTopTracks(await callGetUsersTop("tracks", "short_term", token));
    setRecentlyPlayed(await callRecentlyPlayed(token));
    setLoading(false);
  }, []);

  const renderOptions = () => {
    return (
      <View>
        {renderSlider("Acoustic", acoustic, setAcoustic)}
        {renderSlider("Danceability", danceability, setDanceability)}
        {renderSlider("Energy", energy, setEnergy)}
        {renderSlider("Happiness", valence, setValence)}
        {renderSlider("Popularity", popularity, setPopularity)}
        {renderDiscoverButton()}
      </View>
    );
  };

  const renderDiscoverButton = () => {
    return (
      <Pressable
        style={[
          styles.recommendationsButton,
          {
            backgroundColor: CustomColors.dark.primaryColor,
            margin: 5,
          },
        ]}
        onPress={() =>
          callGetRecommendations(
            newSelectedItems,
            navigation,
            token,
            {
              setText,
              setArtistData,
              dispatch,
              setAcoustic,
              setDanceability,
              setEnergy,
              setPopularity,
              setValence,
              setOptions,
            },
            extraOptions
          )
        }
      >
        <Text style={styles.text}>Discover</Text>
      </Pressable>
    );
  };
  return (
    <ScrollView>
      {loading ? (
        <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 1.9 }}>
          {loadingIcon()}
        </View>
      ) : (
        <>
          <View style={styles.discoverInput}>
            <View
              style={[
                styles.discoverTextBox,
                {
                  borderColor: isFocused ? "#FFF" : "#313131",
                },
              ]}
            >
              <Image
                source={require("../../assets/images/DiscoveryLogoWhite.png")}
                style={{ height: 25, width: 25, marginRight: 8 }}
              />
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
                  onFocus();
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
          <CustomSlider data={newSelectedItems} />
          {newSelectedItems.length > 0 ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={[
                  styles.recommendationsButton,
                  {
                    backgroundColor: CustomColors.dark.primaryColor,
                    margin: 5,
                  },
                ]}
                onPress={() => {
                  if (options) {
                    setOptions(false);
                    setAcoustic(0.5);
                    setDanceability(0.5);
                    setEnergy(0.5);
                    setValence(0.5);
                    setPopularity(0.5);
                  } else {
                    setOptions(true);
                  }
                }}
              >
                <Text style={styles.text}>{options ? "Close" : "Options"}</Text>
              </Pressable>
              {options ? (
                <Pressable
                  style={[
                    styles.recommendationsButton,
                    {
                      backgroundColor: CustomColors.dark.close,
                      margin: 5,
                    },
                  ]}
                  onPress={() => {
                    setAcoustic(0.5);
                    setDanceability(0.5);
                    setEnergy(0.5);
                    setValence(0.5);
                    setPopularity(0.5);
                  }}
                >
                  <Text style={styles.text}>Reset</Text>
                </Pressable>
              ) : (
                renderDiscoverButton()
              )}
            </View>
          ) : null}
          {options ? renderOptions() : null}
          {topTracks.length > 0 ? (
            <Gallery
              title="Select from Your Top Songs"
              data={topTracks}
              selectedItems={selectedItems}
            />
          ) : null}

          {topArtists.length > 0 ? (
            <Gallery
              title="Select from Your Top Artists"
              data={topArtists}
              selectedItems={selectedItems}
            />
          ) : null}

          {recentlyPlayed.length > 0 ? (
            <Gallery
              title="Select from Your Recently Played"
              data={recentlyPlayed}
              selectedItems={selectedItems}
            />
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

const renderSlider = (title, state, setState) => {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Text
        style={{
          width: "25%",
          alignSelf: "center",
          textAlign: "right",
          marginRight: 10,
        }}
      >
        {title}
      </Text>
      <Slider
        containerStyle={{ flex: 1 }}
        value={state}
        onValueChange={(value) => setState(value[0])}
        thumbTintColor={CustomColors.dark.primaryColor}
        maximumTrackTintColor={CustomColors.dark.formBackground}
        minimumTrackTintColor={CustomColors.dark.primaryColor}
        animateTransitions={true}
        animationType="timing"
      />
    </View>
  );
};

const renderSearchResults = (artistData) => {
  return <SearchResults artistData={artistData} />;
};

const callGetRecommendations = async (
  newSelectedItems,
  navigation,
  token,
  stateSetters,
  extraOptions
) => {
  try {
    const recommendedTracks = await callGetRecommendationsApi(
      newSelectedItems,
      10,
      extraOptions,
      token
    );
    clearState(stateSetters);
    navigation.navigate("Recommendations", {
      recommendedTracks: recommendedTracks,
      selectedItems: newSelectedItems,
      extraOptions: extraOptions,
      currentIndex: 0,
    });
  } catch (err) {
    console.log(err);
  }
};

const clearState = (stateSetters) => {
  stateSetters.setText("");
  stateSetters.setArtistData([]);
  stateSetters.dispatch(clearAllItems());
  stateSetters.setAcoustic(0.5);
  stateSetters.setDanceability(0.5);
  stateSetters.setEnergy(0.5);
  stateSetters.setPopularity(0.5);
  stateSetters.setValence(0.5);
  stateSetters.setOptions(false);
};

export default SearchField;
