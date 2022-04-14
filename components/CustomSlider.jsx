import { React, useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselItem from "./CarouselItem";
import styles from "../constants/styles";
import { View } from "./Themed";
import CustomPaging from "./CustomPaging";

const { width } = Dimensions.get("window");
export default function CustomSlider({ data }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 80,
    data: data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
    onSnapToItem: (index) => setSlideIndex(index),
  };
  return (
    <View style={styles.carouselContainer}>
      <Carousel {...settings} />
      <View>
        <CustomPaging data={data} activeSlide={slideIndex} />
      </View>
    </View>
  );
}
