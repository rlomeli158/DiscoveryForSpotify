import { Dimensions, StyleSheet, Platform } from "react-native";
import CustomColors from "./Colors";

const { width: screenWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  carouselContainer: {
    paddingTop: 15,
  },
  carouselTitle: {
    fontSize: 20,
  },
  carouselItem: {
    width: "100%",
    height: screenWidth - 20, //height will be 20 units less than screen width.
  },
  carouselImageContainer: {
    // flex: 1,
    borderRadius: 5,
    backgroundColor: "lightblue",
    marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
    height: "85%",
    width: "100%",
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  dotContainer: {
    backgroundColor: CustomColors.dark.background,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  inactiveDotStyle: {
    backgroundColor: CustomColors.dark.placeholderColor,
  },
  songInfoContainer: {
    justifyContent: "center",
    flex: 1,
  },
  artistName: {
    fontSize: 15,
  },
  artistNameWithSong: {
    fontSize: 13,
    color: CustomColors.dark.primaryColor,
  },
  songName: {
    fontSize: 15,
  },
});
export default styles;
