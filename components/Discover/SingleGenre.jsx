import { Image, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import styles from "../constants/styles";

const SingleGenre = ({ genreInfo, selectedItems, setSelectedItems }) => {
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

export default SingleGenre;
