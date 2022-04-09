import React from "react";
import { ParallaxImage } from "react-native-snap-carousel";
import { Pressable, SafeAreaView } from "react-native";
import { Text, View } from "./Themed";
import styles from "../constants/styles";

function CarouselItem({ item, index }, parallaxProps) {
  console.log(item.artists);
  return (
    <Pressable onPress={() => alert("Image description:" + item.name)}>
      <SafeAreaView style={styles.carouselItem}>
        <ParallaxImage
          source={
            item.album
              ? item.album.images[0]
                ? { uri: item.album.images[0].url }
                : { uri: defaultImage }
              : item.images[0]
              ? { uri: item.images[0].url }
              : { uri: defaultImage }
          }
          containerStyle={styles.carouselImageContainer}
          style={styles.carouselImage}
          {...parallaxProps} /* pass in the necessary props */
        />
        {item.artists && item.album ? (
          <View>
            <Text style={styles.carouselTitle} numberOfLines={2}>
              {item.artists[0].name}
            </Text>
            <Text style={styles.carouselTitle} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        ) : (
          <Text style={styles.carouselTitle} numberOfLines={2}>
            {item.name}
          </Text>
        )}
      </SafeAreaView>
    </Pressable>
  );
}

export default CarouselItem;
