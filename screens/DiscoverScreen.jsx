import { useEffect } from "react";
import { ImageBackground, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { checkIfExpired, getTokens } from "../client/authenticationClient";
import SearchField from "../components/Discover/SearchField";
import { Text } from "../components/Themed";
import styles from "../constants/styles";

const Discover = ({ navigation }) => {
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require(".././assets/images/blackCircularGradient.png")}
    >
      <ScrollView
        style={styles.pageContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <Text style={styles.pageHeader}>Discover</Text>
          <SearchField />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Discover;
