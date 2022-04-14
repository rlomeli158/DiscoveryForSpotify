import { ScrollView } from "react-native";
import SearchField from "../components/Discover/SearchField";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import styles from "../constants/styles";

export default function Discover({
  navigation,
}: RootTabScreenProps<"Discover">) {
  return (
    <ScrollView style={styles.discoverPageContainer}>
      <View>
        <Text style={styles.pageHeader}>Discover</Text>
      </View>
      <View>
        <SearchField error="" />
      </View>
    </ScrollView>
  );
}
