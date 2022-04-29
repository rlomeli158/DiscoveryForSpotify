import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TextInput, ScrollView } from "react-native";
import { Text, View } from "../Themed";
import CustomColors from "../../constants/Colors";
import SearchResults from "./SearchResults";
import CustomSlider from "../Carousel/Recommendation/CustomCarousel";
import { useNavigation } from "@react-navigation/native";
import styles from "../../constants/styles";
import {
  callSearchApi,
  callGetRecommendationsApi,
} from "../../client/spotifyClient";
import { useSelector } from "react-redux";

export default function SearchField({ onFocus = () => {}, error }) {
  const token = useSelector((state) => state.token.value);
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
            callGetRecommendations(selectedItems, navigation, token, {
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
  token,
  stateSetters
) => {
  try {
    const recommendedTracks = await callGetRecommendationsApi(
      selectedItems,
      10,
      token
    );
    clearState(stateSetters);
    navigation.navigate("Recommendations", {
      recommendedTracks: recommendedTracks,
      selectedItems: selectedItems,
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
