import { Image, StyleSheet, TouchableOpacity } from "react-native";
import CustomColors from "../constants/Colors";
import { Text } from "./Themed";

const SingleGenre = ({ genreInfo, selectedItems, setSelectedItems }) => {
  console.log(JSON.stringify(genreInfo) + ",");
  return (
    <TouchableOpacity
      onPress={() => {
        addGenre(genreInfo, selectedItems, setSelectedItems);
      }}
      style={styles.genreView}
    >
      <Image
        style={styles.genreImage}
        source={{
          uri: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU0fHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        }}
      />
      <Text style={styles.genreName}>{genreInfo.displayName}</Text>
    </TouchableOpacity>
  );
};

const addGenre = (genreInfo, selectedItems, setSelectedItems) => {
  let newList = selectedItems.slice();
  if (!newList.includes(genreInfo) && newList.length < 5) {
    newList.push(genreInfo);
    setSelectedItems(newList);
  }
};

const styles = StyleSheet.create({
  genreView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  genreName: {
    fontSize: 18,
    position: "absolute",
    fontWeight: "bold",
    color: CustomColors.dark.primaryColor,
    textAlign: "center",
  },
  genreImage: {
    width: 113,
    height: 113,
    borderRadius: 10,
  },
});

export default SingleGenre;
