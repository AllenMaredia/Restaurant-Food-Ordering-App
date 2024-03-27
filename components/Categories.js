import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import React from "react";

const Categories = () => {
  const categories = [
    {
      id: 0,
      image:
        "https://static.vecteezy.com/system/resources/previews/010/252/103/original/cute-cartoon-hamburger-file-free-png.png",
      name: "Burgers",
    },
    {
      id: 1,
      image:
        "https://cdn-icons-png.flaticon.com/512/590/590717.png?w=826&t=st=1690341840~exp=1690342440~hmac=cb2b2a23dccc0c3704cca1bb1f51df29047c7d1bc51b87bbf1c73f6c3b6aa4f8",
      name: "Fries",
    },
    {
      id: 2,
      image:
        "https://cdn-icons-png.flaticon.com/512/1092/1092703.png?w=826&t=st=1690341878~exp=1690342478~hmac=fb0d29ddff76e3d9e7edacf883a1625b31baf10312cb8c4f4a4cb18dce7e8df3",
      name: "Milkshakes",
    },
    {
      id: 3,
      image:
        "https://cdn-icons-png.flaticon.com/512/938/938063.png?w=826&t=st=1690341901~exp=1690342501~hmac=8a73bc5e59fa4c791aea4903ba1b9780d43abf1cc774dd4820c5196d86126c8f",
      name: "Deserts",
    },
    {
      id: 4,
      image:
        "https://cdn-icons-png.flaticon.com/512/1257/1257653.png?w=826&t=st=1690343245~exp=1690343845~hmac=96c776aa0cd4969f21d2713b5856d27dda1f12e3dffc2a4c4a248bf7ff114498",
      name: "Drinks",
    },
  ];

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Categories</Text>
      <ScrollView horizontal persistentScrollbar={true}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={{
              margin: 10,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
            }}
          >
            <Image
              source={{ uri: category.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
