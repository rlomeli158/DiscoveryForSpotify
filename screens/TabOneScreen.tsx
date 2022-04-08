import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import SearchField from "../components/SearchField";
import { Text, View } from "../components/Themed";
import CustomColors from "../constants/Colors";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Let's find some new music</Text>
        <Text style={styles.subtitle}>
          Select up to 5 artists, songs, and genres
        </Text>
      </View>
      <View>
        <SearchField title="Artist" placeholder="Artist's name..." error="" />
        <SearchField title="Song" placeholder="Song's name..." error="" />
        <SearchField title="Genre" placeholder="Genre's name..." error="" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomColors.dark.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
});
