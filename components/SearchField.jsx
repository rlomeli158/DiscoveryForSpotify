import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { Text, View } from "./Themed";
import CustomColors from "../constants/Colors";
import SearchResults from "./SearchResults";
import CustomSlider from "./CustomSlider";
import { useNavigation } from "@react-navigation/native";
import { arrayOfGenres } from "../constants/genres";

const token =
  "BQA9PYW58d5aF-ImgslpSLhVd2KhZurf6HLp0IiGJF_ZgFRgcYvWdnRLhI6V4NSSaJ2lDBa08oDfXPe8CPCuMxwichVtKmZsyuv08OM_l6rd-1yxjKvh_khgPjI_YZUCnMzb6sb-uuJiiA";

export default function SearchField({ onFocus = () => {}, error }) {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [text, setText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setText("");
    setArtistData([]);
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
              if (newText === "") {
                setArtistData([]);
                setText("");
              } else {
                setText(newText);
                try {
                  let spotifyResponse = await fetch(
                    `https://api.spotify.com/v1/search?q=${newText}&type=track,artist`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  let responseJson = await spotifyResponse.json();
                  let sortedArray =
                    responseJson.tracks.items.concat(arrayOfGenres);

                  sortedArray = sortedArray.concat(responseJson.artists.items);

                  const newArray = sortedArray.filter((result) => {
                    const compareName = newText.toLowerCase();
                    if (result.displayName) {
                      return result.displayName
                        .toLowerCase()
                        .startsWith(compareName);
                    } else {
                      return result.name.toLowerCase().startsWith(compareName);
                    }
                  });

                  setArtistData(newArray);
                  setShowFilters(false);
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
            placeholder={"Search..."}
            placeholderTextColor={CustomColors.dark.placeholderColor}
            value={text}
          />
        </View>
      </View>
      {artistData
        ? renderSearchResults(artistData, selectedItems, setSelectedItems)
        : null}
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
      encodedGenres += item.spotifyName + ",";
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
      currentIndex: 0,
    });
  } catch (err) {
    console.log(err);
  }
};

const clearState = (stateSetters) => {
  stateSetters.setText("");
  stateSetters.setArtistData([]);
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
