import { ScrollView, StyleSheet } from "react-native";
import CustomSlider from "../components/CustomSlider";
import SearchField from "../components/SearchField";
import { Text, View } from "../components/Themed";
import CustomColors from "../constants/Colors";

const Recommendations = ({ route, navigation }) => {
  const { recommendedTracks } = route.params;
  console.log("HI! IM HERE", recommendedTracks);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recommended For You</Text>
      <CustomSlider data={recommendedTracks} />
    </ScrollView>
  );
};

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
  pageHeader: {
    fontSize: 25,
    textAlign: "left",
    marginBottom: 5,
  },
});

export default Recommendations;
