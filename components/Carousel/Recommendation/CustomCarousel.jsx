import { React, useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselItem from "./RecommendItem";
import styles from "../../../constants/styles";
import { View } from "../../Themed";
import CustomPaging from "../CustomPaging";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");
export default function CustomSlider({ data }) {
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 80,
    data: data,
    renderItem: ({ item, index }, parallaxProps) =>
      CarouselItem({ item, index }, parallaxProps, dispatch),
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
