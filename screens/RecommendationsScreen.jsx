import { useState, useEffect, useRef, useCallback } from "react";
import {
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Text, View } from "../components/Themed";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import CustomColors from "../constants/Colors";
import OverflowItems from "../components/Carousel/InfoAndPlayer";
import { useSelector, useDispatch } from "react-redux";
import { playTrack, stopTrack } from "./InfoScreenTrack";
import { Ionicons } from "@expo/vector-icons";
import { callGetRecommendationsApi } from "../client/spotifyClient";

const { width } = Dimensions.get("screen");
const SPACING = 0;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;
const VISIBLE_ITEMS = 3;

const Recommendations = ({ route, navigation }) => {
  const token = useSelector((state) => state.token.value);
  const playingSound = useSelector((state) => state.playingSound.value);
  const dispatch = useDispatch();
  const { recommendedTracks, selectedItems, extraOptions, currentIndex } =
    route.params;

  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [reset, setReset] = useState(false);
  const setActiveIndex = useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  useEffect(() => {
    if (currentIndex == 0 && !reset) {
      Animated.spring(scrollXAnimated, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setIndex(0);
      setActiveIndex(0);
      setReset(true);
    }
  });

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  // useEffect(() => {
  //   console.log("RESETTING ?", resetActiveIndex);
  //   if (resetActiveIndex[0] == true) {
  //     setActiveIndex(0);
  //   }
  // }, []);

  useEffect(() => {
    if (playingSound) {
      stopTrack(playingSound, dispatch);
      if (recommendedTracks[index].preview_url) {
        playTrack(recommendedTracks[index].preview_url, dispatch);
      }
    } else if (recommendedTracks[index].preview_url) {
      playTrack(recommendedTracks[index].preview_url, dispatch);
    }
  }, [index]);

  useEffect(async () => {
    await navigation.addListener("beforeRemove", async () => {
      if (playingSound != false) {
        stopTrack(playingSound, dispatch);
      }
    });
  }, [navigation, playingSound]);

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={async (ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === recommendedTracks.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={async (ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => {
                if (playingSound) {
                  stopTrack(playingSound, dispatch);
                }
                navigation.goBack();
              }}
            >
              <Ionicons
                name="chevron-back-circle-outline"
                size={40}
                color="#FFF"
              />
            </Pressable>
            <Text
              style={[
                styles.pageHeader,
                { justifyContent: "center", alignSelf: "center", fontSize: 25 },
              ]}
            >
              Your Discovery
            </Text>
            <Pressable
              onPress={async () => {
                const recommendedTracks = await callGetRecommendationsApi(
                  selectedItems,
                  10,
                  extraOptions,
                  token
                );
                if (playingSound) {
                  stopTrack(playingSound, dispatch);
                }
                setReset(false);
                navigation.navigate("Recommendations", {
                  recommendedTracks: recommendedTracks,
                  selectedItems: selectedItems,
                  extraOptions: extraOptions,
                  currentIndex: 0,
                });
              }}
            >
              <Ionicons name="refresh-circle-outline" size={40} color="#FFF" />
            </Pressable>
          </View>
          <FlatList
            data={recommendedTracks}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
              marginTop: 30,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [
                style,
                { zIndex: recommendedTracks.length - index },
              ];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <Image
                    source={
                      item.album
                        ? item.album.images[0]
                          ? { uri: item.album.images[0].url }
                          : { uri: defaultImage }
                        : { uri: defaultImage }
                    }
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
          <OverflowItems
            data={recommendedTracks}
            scrollXAnimated={scrollXAnimated}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: CustomColors.dark.background,
  },
  playContainer: {
    position: "relative",
    top: -80,
    backgroundColor: "#FFF",
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
