import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://media-cdn.tripadvisor.com/media/photo-s/11/b7/2b/c1/upper-burger-grill.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/04/73/6a/83/benson-brewery.jpg",
  ];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "95%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
