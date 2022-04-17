import { ScrollView } from "react-native";
import SearchField from "../components/Discover/SearchField";
import { Text, View } from "../components/Themed";
import styles from "../constants/styles";

export default function Discover({ navigation }) {
  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View>
        <Text style={styles.pageHeader}>Discover</Text>
      </View>
      <View>
        <SearchField error="" />
      </View>
    </ScrollView>
  );
}
