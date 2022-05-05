import { Dimensions, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "react-native-svg";
import CustomColors from "./Colors";

const { width: screenWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  //General page styles
  pageContainer: {
    backgroundColor: CustomColors.dark.background,
    // backgroundColor: "transparent",
    paddingTop: 75,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  pageSeparator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
  pageHeader: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 5,
  },
  pageSubHeader: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    marginVertical: 13,
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
    backgroundColor: CustomColors.dark.background,
    marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
    height: "85%",
    width: "100%",
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  // Gallery
  galleryList: {
    flex: 1,
    width: "100%",
    marginHorizontal: -5,
  },
  galleryView: {
    marginHorizontal: 5,
    flex: 1,
  },
  galleryImage: {
    height: screenWidth / 2.2,
    width: screenWidth / 2.2,
    // resizeMode: "contain",
    borderRadius: 15,
  },
  galleryText: {
    flex: 1,
    width: screenWidth / 2.2,
  },
  // Vertical List
  songContainer: {
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#313131",
    borderColor: "#FFF",
    marginVertical: 5,
    width: "100%",
    height: screenWidth / 5,
    flexDirection: "row",
  },
  listImage: {
    justifyContent: "center",
    width: screenWidth / 5,
    height: screenWidth / 5,
    borderRadius: 15,
  },
  listText: {
    flex: 1,
    backgroundColor: "#313131",
    justifyContent: "center",
    marginLeft: 10,
  },
  // Info page
  infoPageContainer: {
    backgroundColor: CustomColors.dark.background,
  },
  infoPageTextContainer: {
    paddingHorizontal: 10,
  },
  infoImage: {
    height: screenWidth,
    width: screenWidth,
    marginBottom: 10,
  },
  artistSubheader: {
    fontSize: 30,
    fontWeight: "700",
    color: CustomColors.dark.primaryColor,
  },
  artistFollowers: {
    fontSize: 13,
    fontWeight: "500",
    color: CustomColors.dark.formBackground,
    textAlign: "left",
    flex: 1,
    marginBottom: 5,
  },
  genreContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#313131",
    padding: 10,
    margin: 5,
  },
  genreText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
  },
  // Track info page
  songNameInfoPage: {
    fontSize: 20,
    fontWeight: "600",
  },
  artistNameInfoPage: {
    fontSize: 15,
    fontWeight: "600",
    color: CustomColors.dark.primaryColor,
  },
  // Playlist info page
  playlistName: {
    fontSize: 25,
    fontWeight: "700",
  },
  // Grid styles:
  itemContainerInGridSmall: {
    flexDirection: "column",
    marginHorizontal: 3,
    marginVertical: 2,
    maxWidth: screenWidth / 3.25,
    maxHeight: screenWidth / 2,
  },
  itemImageInGridSmall: {
    resizeMode: "contain",
    width: screenWidth / 3.25,
    height: screenWidth / 3.25,
    borderRadius: 20,
  },
  itemContainerInGridLarge: {
    flexDirection: "column",
    marginHorizontal: 2,
    marginVertical: 5,
    maxWidth: screenWidth / 2.15,
    maxHeight: screenWidth,
  },
  itemImageInGridLarge: {
    resizeMode: "contain",
    width: screenWidth / 2.15,
    height: screenWidth / 2.15,
    borderRadius: 25,
  },
  songNameInGridSmall: {
    marginHorizontal: 5,
    paddingTop: 6,
    fontSize: 10,
    fontWeight: "700",
  },
  artistNameWithSongInGridSmall: {
    marginHorizontal: 5,
    fontSize: 10,
    color: CustomColors.dark.primaryColor,
    fontWeight: "700",
  },
  artistNameInGridSmall: {
    marginHorizontal: 5,
    paddingTop: 5,
    fontSize: 13,
    fontWeight: "700",
  },
  songNameInGridLarge: {
    marginHorizontal: 5,
    paddingTop: 6,
    fontSize: 13,
    fontWeight: "700",
  },
  artistNameWithSongInGridLarge: {
    marginHorizontal: 5,
    fontSize: 13,
    color: CustomColors.dark.primaryColor,
    fontWeight: "700",
  },
  artistNameInGridLarge: {
    marginHorizontal: 5,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: "700",
  },
  // Tabs in Grid
  tabContainer: {
    flexDirection: "row",
    height: screenWidth / 8,
  },
  tab: {
    width: "50%",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
  },
  // Grid text
  topText: {
    fontSize: 20,
    fontWeight: "600",
  },
  textTime: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  topItemsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: CustomColors.dark.primaryColor,
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
    fontSize: 13,
    fontWeight: "700",
  },
  artistNameWithSong: {
    fontSize: 13,
    color: CustomColors.dark.primaryColor,
    fontWeight: "700",
  },
  songName: {
    paddingTop: 10,
    fontSize: 13,
    fontWeight: "700",
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
    borderRadius: 30,
    elevation: 3,
    backgroundColor: CustomColors.dark.primaryColor,
    width: "30%",
    alignSelf: "center",
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
    backgroundColor: "#313131",
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
  // Comments section
  // Comment box
  commentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  commentAreaContainer: {
    padding: 15,
    flexDirection: "row",
  },
  commentInput: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "lightgrey",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  commentProfilePic: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  replyProfilePic: {
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  // Individual comment
  individualCommentContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
  },
  individualReplyContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    marginLeft: 50,
  },
  commentTextContainer: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentDisplayName: {
    fontSize: 10,
    color: CustomColors.dark.primaryColor,
    fontFamily: "PoppinsBold",
  },
  replyText: {
    fontSize: 10,
    color: CustomColors.dark.primaryColor,
    fontFamily: "PoppinsBold",
  },
  deleteText: {
    fontSize: 10,
    color: CustomColors.dark.formBackground,
    fontFamily: "PoppinsBold",
  },
  comment: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  // Log In Page
  logInButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
    // backgroundColor: CustomColors.dark.primaryColor,
    backgroundColor: "#1DB954",
    width: "55%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  logInButtonText: {
    fontSize: 17,
  },
  // //Open in Spotify
  // logInButton: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 10,
  //   borderRadius: 20,
  //   elevation: 3,
  //   // backgroundColor: CustomColors.dark.primaryColor,
  //   backgroundColor: "#1DB954",
  //   width: "50%",
  //   alignSelf: "center",
  //   marginTop: 20,
  // },
});
export default styles;
