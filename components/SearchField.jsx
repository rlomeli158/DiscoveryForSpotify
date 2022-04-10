import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, View } from "./Themed";
import CustomColors from "../constants/Colors";
import SearchResults from "./SearchResults";
import CustomSlider from "./CustomSlider";
import { useNavigation } from "@react-navigation/native";
import GenreListings from "./GenreListings";

const token =
  "BQBoC7YhmrUI9fawqikFafcuREIQPMCNLkjehobdB0lb1LqSpiFNii22l6ln7jh3ncAwJI9XwUKzh2rWE1RzymA1y3oV4YYbvqcLq3QY20fbhlRJxymk7BdgThftwlGpQmyv8kJRfFNo3Q";

export default function SearchField({ onFocus = () => {}, error }) {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [text, setText] = useState("");
  const [searchFilter, setSearchFilter] = useState("artist");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setText("");
    setArtistData([]);
    setShowFilters(true);
    setSearchFilter("artist");
  }, [selectedItems]);

  return (
    <ScrollView>
      <View style={styles.input}>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: isFocused
                ? CustomColors.dark.primaryColor
                : CustomColors.dark.primaryText,
            },
          ]}
        >
          <MaterialIcons
            name="saved-search"
            size={30}
            color={CustomColors.dark.primaryColor}
            style={styles.icon}
          />
          <TextInput
            autoCorrect={false}
            onChangeText={async (newText) => {
              if (!newText) {
                setArtistData([]);
                setShowFilters(true);
                setText("");
              } else {
                setText(newText);
                console.log(
                  `https://api.spotify.com/v1/search?q=${newText}&type=${searchFilter}`
                );
                try {
                  let spotifyResponse = await fetch(
                    `https://api.spotify.com/v1/search?q=${newText}&type=${searchFilter}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  let responseJson = await spotifyResponse.json();
                  //console.log(responseJson);
                  setShowFilters(false);
                  if (searchFilter == "artist") {
                    setArtistData(responseJson.artists.items);
                  } else {
                    setArtistData(responseJson.tracks.items);
                  }
                } catch (err) {
                  error = err;
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
            style={styles.fieldDescription}
            placeholder={
              searchFilter == "artist"
                ? "Artist's name..."
                : searchFilter == "track"
                ? "Song's name"
                : "Select genre(s)"
            }
            placeholderTextColor={CustomColors.dark.placeholderColor}
            value={text}
          />
        </View>
      </View>
      {showFilters ? (
        <View style={styles.buttonRow}>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  searchFilter === "artist"
                    ? CustomColors.dark.primaryColor
                    : CustomColors.dark.formBackground,
              },
            ]}
            onPress={() => {
              setSearchFilter("artist");
            }}
          >
            <Text style={styles.text}>Artists</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  searchFilter === "track"
                    ? CustomColors.dark.primaryColor
                    : CustomColors.dark.formBackground,
              },
            ]}
            onPress={() => {
              setSearchFilter("track");
            }}
          >
            <Text style={styles.text}>Songs</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  searchFilter === "genre"
                    ? CustomColors.dark.primaryColor
                    : CustomColors.dark.formBackground,
              },
            ]}
            onPress={() => {
              setSearchFilter("genre");
            }}
          >
            <Text style={styles.text}>Genres</Text>
          </Pressable>
        </View>
      ) : null}
      {artistData
        ? renderSearchResults(artistData, selectedItems, setSelectedItems)
        : null}
      {searchFilter === "genre" ? (
        <GenreListings
          genreQuery={text}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ) : null}
      <ScrollView>
        <CustomSlider data={selectedItems} />
      </ScrollView>
      {selectedItems.length > 0 ? (
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: CustomColors.dark.primaryColor,
              margin: 5,
            },
          ]}
          onPress={() =>
            callGetRecommendations(selectedItems, navigation, {
              setText,
              setArtistData,
              setSearchFilter,
              setShowFilters,
              setSelectedItems,
            })
          }
        >
          <Text style={styles.text}>Find Recommendations</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const renderSearchResults = (artistData, selectedItems, setSelectedItems) => {
  return (
    <SearchResults
      artistData={artistData}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
    />
  );
};

const callGetRecommendations = async (
  selectedItems,
  navigation,
  stateSetters
) => {
  let spotifyUrl = "https://api.spotify.com/v1/recommendations?&limit=10&";
  let encodedArtistIds = "";
  let encodedTrackIds = "";
  let encodedGenres = "";

  selectedItems.forEach((item) => {
    if (item.type === "artist") {
      encodedArtistIds += item.id + ",";
    } else if (item.type === "track") {
      encodedTrackIds += item.id + ",";
    } else {
      encodedGenres += item + ",";
    }
  });

  encodedArtistIds = encodedArtistIds.slice(0, -1);
  encodedTrackIds = encodedTrackIds.slice(0, -1);
  encodedGenres = encodedGenres.slice(0, -1);

  const decodedArray = [];

  if (encodedArtistIds) {
    decodedArray.push("seed_artists=" + encodeURIComponent(encodedArtistIds));
  }
  if (encodedTrackIds) {
    decodedArray.push("seed_tracks=" + encodeURIComponent(encodedTrackIds));
  }
  if (encodedGenres) {
    decodedArray.push("seed_genres=" + encodeURIComponent(encodedGenres));
  }

  const encodedString = decodedArray.join("&");

  try {
    let spotifyResponse = await fetch(spotifyUrl + encodedString, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let responseJson = await spotifyResponse.json();

    clearState(stateSetters);
    navigation.navigate("Recommendations", {
      recommendedTracks: responseJson.tracks,
    });
  } catch (err) {
    console.log(err);
  }
};

const clearState = (stateSetters) => {
  stateSetters.setText("");
  stateSetters.setArtistData([]);
  stateSetters.setSearchFilter("artist");
  stateSetters.setShowFilters(true);
  stateSetters.setSelectedItems([]);
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: CustomColors.dark.primaryColor,
    marginHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  inputContainer: {
    height: 40,
    width: "100%",
    backgroundColor: CustomColors.dark.formBackground,
    flexDirection: "row",
    paddingHorizontal: 5,
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
  },
  fieldName: {
    width: "17%",
    textAlign: "right",
    fontSize: 24,
    lineHeight: 22,
    paddingVertical: 15,
  },
  fieldDescription: {
    fontSize: 20,
    color: CustomColors.dark.secondaryText,
    flex: 1,
  },
  errorText: {
    color: CustomColors.dark.error,
    fontWeight: "bold",
    textAlign: "center",
  },
});
