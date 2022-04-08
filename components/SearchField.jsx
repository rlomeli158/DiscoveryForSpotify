import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import CustomColors from "../constants/Colors";
import { useState } from "react";
import SearchResult from "./SearchResults";

const token =
  "BQBxG0qlfo5T30npkQGdpPca0vFMQGQ-Ur04dodUV1ZgPVS0khZzbYNMVZDm-_A2kLg0r35rv5LROe9zYKelLduSi1k3gRRyPTDHIc-7bk_cWLIy3Vq61Y8WMlZCDQA2VUOq8CwwFctRBg";

export default function SearchField({ onFocus = () => {}, error }) {
  const [isFocused, setIsFocused] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("artist");
  const [showFilters, setShowFilters] = useState(true);

  return (
    <View>
      <View style={styles.input}>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: error
                ? CustomColors.dark.error
                : isFocused
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
              } else {
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
                  console.log(responseJson.artists.items);
                  setShowFilters(false);
                  setArtistData(responseJson.artists.items);
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
          />
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
      {artistData ? <SearchResult artistData={artistData} /> : null}
    </View>
  );
}

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
