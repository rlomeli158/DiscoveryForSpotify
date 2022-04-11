import { StyleSheet } from "react-native";
import { genreObj } from "../constants/genres";
import SingleGenre from "./SingleGenre";
import { View } from "./Themed";

const GenreListings = ({ genreQuery, selectedItems, setSelectedItems }) => {
  return (
    <View style={styles.genreGrid}>
      {Object.entries(genreObj).map((genre) => {
        if (
          !genreQuery ||
          genre[1].displayName.toLowerCase().startsWith(genreQuery)
        ) {
          return (
            <SingleGenre
              key={genre[1].spotifyName}
              genreInfo={genre[1]}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default GenreListings;
