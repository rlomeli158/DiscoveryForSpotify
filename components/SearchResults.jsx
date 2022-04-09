import React, { useState } from "react";
import { FlatList, StyleSheet, Image, Button } from "react-native";
import { Text, View } from "./Themed";

const defaultImage =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

export default function SearchResult({
  artistData,
  selectedItems,
  setSelectedItems,
}) {
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        // data={Object.values(artistData)[0]}
        data={artistData}
        renderItem={({ item }) => {
          return (
            <View
              style={styles.listContainer}
              onStartShouldSetResponder={() => {
                console.log(item.name, "Clicked");
                console.log(selectedItems);
                let newList = selectedItems.slice();
                if (!newList.includes(item.name) && newList.length < 5) {
                  newList.push(item.name);
                  setSelectedItems(newList);
                }
              }}
            >
              <Image
                style={styles.image}
                source={
                  item.album
                    ? item.album.images[0]
                      ? { uri: item.album.images[0].url }
                      : { uri: defaultImage }
                    : item.images[0]
                    ? { uri: item.images[0].url }
                    : { uri: defaultImage }
                }
              />
              <View style={styles.textContainer}>
                <Text style={styles.artistName}>{item.name}</Text>
              </View>
              {/* <Button
                title="hi"
                onPress={() => {
                  console.log("hi");
                  dummyFunction();
                  // setSelectedItems(["hi"]);
                }}
              ></Button> */}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
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
