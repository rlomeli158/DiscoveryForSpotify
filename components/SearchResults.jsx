import React from "react";
import { FlatList, StyleSheet, Image } from "react-native";
import { Text, View } from "./Themed";

const defaultImage =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

export default function SearchResult(artistData) {
  return (
    <FlatList
      //   data={[
      //     {
      //       name: "Drake",
      //       image:
      //         "https://media1.popsugar-assets.com/files/thumbor/zan-t_Me63if8oqWYE9ENiPLlhA/0x224:2826x3050/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/02/11/894/n/1922398/87f6bb525e430e7bd44e40.22278576_/i/Drake.jpg",
      //     },
      //     {
      //       name: "Olivia Rodrigo",
      //       image:
      //         "https://yt3.ggpht.com/DIEqRepL0JEro5q3en3lLUyI_vqmot1yghANEaDjANJULzP-2BaewW0XSQX-mzbAgmp4EuODjTA=s900-c-k-c0x00ffffff-no-rj",
      //     },
      //   ]}
      data={Object.values(artistData)[0]}
      renderItem={({ item }) => {
        return (
          <View style={styles.listContainer}>
            <Image
              style={styles.image}
              source={
                item.images[0]
                  ? { uri: item.images[0].url }
                  : { uri: defaultImage }
              }
            />
            <View style={styles.textContainer}>
              <Text style={styles.artistName}>{item.name}</Text>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
  },
  textContainer: {
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  artistName: {
    fontSize: 25,
  },
});
