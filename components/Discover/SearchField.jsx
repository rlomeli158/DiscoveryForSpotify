import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TextInput, ScrollView } from "react-native";
import { Text, View } from "../Themed";
import CustomColors from "../../constants/Colors";
import SearchResults from "./SearchResults";
import CustomSlider from "../CustomSlider";
import { useNavigation } from "@react-navigation/native";
import { arrayOfGenres } from "../../constants/genres";
import styles from "../../constants/styles";

const token =
  "BQAepPNxF_lRTfTkoOoGweQ3-JUzKxLzSMESfDnKlCShbNliONaAznZJ5xaVNoIgUl9ecXsZXo5e7eWfCegPnanM7yTGA1-Wwzui-rvKst3Bf8_047jyCGsqtgiISNBr6t46uk0sHb5VUA";

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
      <View style={styles.discoverInput}>
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
          <MaterialIcons
            name="saved-search"
            size={30}
            color={CustomColors.dark.primaryColor}
            style={styles.searchIcon}
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
      {artistData
        ? renderSearchResults(artistData, selectedItems, setSelectedItems)
        : null}
      <ScrollView>
        <CustomSlider data={selectedItems} />
      </ScrollView>
      {selectedItems.length > 0 ? (
        <Pressable
          style={[
            styles.recommendationsButton,
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
