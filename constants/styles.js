import { Dimensions, StyleSheet, Platform } from "react-native";
import CustomColors from "./Colors";

const { width: screenWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  //General page styles
  discoverPageContainer: {
    backgroundColor: CustomColors.dark.background,
    paddingTop: 75,
    paddingHorizontal: 20,
  },
  pageSeparator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
  pageHeader: {
    fontSize: 25,
    textAlign: "left",
    marginBottom: 5,
  },
  //Carousel
  carouselContainer: {
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselTitle: {
    fontSize: 20,
  },
  carouselItem: {
    width: "100%",
    height: screenWidth - 20, //height will be 20 units less than screen width.
  },
  carouselImageContainer: {
    borderRadius: 10,
    backgroundColor: "lightblue",
    marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
    height: "85%",
    width: "100%",
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  //Carousel Pagination
  dotContainer: {
    backgroundColor: CustomColors.dark.background,
    paddingTop: 5,
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
  },
  //Carousel artist name styles
  artistName: {
    paddingTop: 10,
    fontSize: 15,
  },
  artistNameWithSong: {
    fontSize: 13,
    color: CustomColors.dark.primaryColor,
  },
  songName: {
    paddingTop: 10,
    fontSize: 15,
  },
  //Genre listings
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
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  //Search results
  resultsContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
  },
  songInformationTextContainer: {
    justifyContent: "center",
    flex: 1,
  },
  resultsImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  resultsArtistName: {
    fontSize: 15,
  },
  resultsArtistNameWithSong: {
    fontSize: 13,
    color: CustomColors.dark.primaryColor,
  },
  resultsSongName: {
    fontSize: 15,
  },
  recommendationsButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: CustomColors.dark.primaryColor,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  discoverInput: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  discoverTextBox: {
    height: 40,
    width: "100%",
    backgroundColor: CustomColors.dark.formBackground,
    flexDirection: "row",
    paddingHorizontal: 5,
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 5,
  },
  errorText: {
    color: CustomColors.dark.error,
    fontWeight: "bold",
    textAlign: "center",
  },
  placeholderStyle: {
    fontSize: 20,
    color: CustomColors.dark.secondaryText,
    fontWeight: "500",
    flex: 1,
  },
});
export default styles;
