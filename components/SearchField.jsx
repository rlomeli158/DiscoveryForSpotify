import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import CustomColors from "../constants/Colors";
import { useState } from "react";
import SearchResult from "./SearchResults";

const token =
  "BQB-0OjyVLvYxweKf2UkvjwS6z292wwYz3151neexEAfbqRKDPRYz0ShJvh435XWo_zqNDIBPYOw-sdb8EKU_tszBfKIw8M3OXnptSz5zGsZdzVAaee5LP-QmFNQaN8vBBLLqwyjqeAUEg";

export default function SearchField({ onFocus = () => {}, error }) {
  const [isFocused, setIsFocused] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("Artists");
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
                    `https://api.spotify.com/v1/search?q=${newText}&type=${title.toLowerCase()}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  let responseJson = await spotifyResponse.json();
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
            placeholder={`${searchFilter.slice(0, -1)}'s name...`}
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
                  searchFilter === "Artists"
                    ? CustomColors.dark.primaryColor
                    : CustomColors.dark.formBackground,
              },
            ]}
            onPress={() => {
              setSearchFilter("Artists");
            }}
          >
            <Text style={styles.text}>Artists</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  searchFilter === "Songs"
                    ? CustomColors.dark.primaryColor
                    : CustomColors.dark.formBackground,
              },
            ]}
            onPress={() => {
              setSearchFilter("Songs");
            }}
          >
            <Text style={styles.text}>Songs</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  searchFilter === "Genres"
                    ? CustomColors.dark.primaryColor
                    : CustomColors.dark.formBackground,
              },
            ]}
            onPress={() => {
              setSearchFilter("Genres");
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
