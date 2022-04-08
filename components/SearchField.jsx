import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import CustomColors from "../constants/Colors";
import { useState } from "react";
import SearchResult from "./SearchResults";

const token =
  "BQA4zrVQ0Pq8EdhRFBtiqhI8_4XJAOZvF53_IZGf5MU5xhI0iriCDs8pN4WMC5RMsp3K-DJBFaobVBjgK9s7D8dUHM0Z0VpYRBCi5NJvY9VZ5Quka7hndxxxZV8ZEQnSMVrbtN5FCDE3YA";

export default function SearchField({
  title,
  onFocus = () => {},
  error,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [artistData, setArtistData] = useState();
  return (
    <View>
      <View style={styles.input}>
        <Text style={styles.fieldName}>{title}</Text>
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
              } else {
                try {
                  // console.log("hello");
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
                  setArtistData(responseJson.artists.items);
                  // console.log(responseJson.artists.items);
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
            {...props}
            placeholderTextColor={CustomColors.dark.placeholderColor}
          />
        </View>
      </View>
      {artistData ? <SearchResult artistData={artistData} /> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  input: {
    marginTop: 5,
    flexDirection: "row",
  },
  inputContainer: {
    height: 40,
    width: "80%",
    backgroundColor: CustomColors.dark.formBackground,
    flexDirection: "row",
    marginHorizontal: 15,
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
