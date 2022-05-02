import { ScrollView } from "react-native";
import SearchField from "../components/Discover/SearchField";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";

const Discover = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <Text style={styles.pageHeader}>Discover</Text>
      </View>
      <View>
        <SearchField />
      </View>
    </ScrollView>
  );
};

export default Discover;
