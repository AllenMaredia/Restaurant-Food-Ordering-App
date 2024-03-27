import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalCost = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const totalItems = cart
    .map((item) => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState();

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  //console.log(product);
  useEffect(() => {
    if (product.length > 0) return;

    setProductsLoading(true);

    const fetchProducts = async () => {
      const colRef = collection(db, "products");
      const docSnap = await getDocs(colRef);

      docSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((prod) => dispatch(getProducts(prod)));

      setProductsLoading(false);
    };
    fetchProducts();
  }, []);
  //console.log('PRODUCT: ',product);

  const setCategory = (p) => {
    //console.log("P IS ", p);
    if (p.name === categorySelected) {
      setCategorySelected();
    } else {
      setCategorySelected(p.name);
    }
  };

  function getFilteredProducts() {
    if (!categorySelected) return product;

    var filtered = product.filter(function (el) {
      return el.category === categorySelected;
    });
    //console.log("FILTERED: ", filtered);
    return filtered;
  }

  var filteredProducts = useMemo(
    () => getFilteredProducts(),
    [categorySelected]
  );
  if (filteredProducts.length < 1) filteredProducts = product;
  //console.log("FILTERED PRODS: ",filteredProducts);

  useEffect(() => {
    //console.log("Selected Category: ", categorySelected);
  }, [categorySelected]);

  const products = [
    {
      id: 0,
      image:
        "https://groundbeefrecipes.com/wp-content/uploads/double-bacon-cheeseburger-recipe-6.jpg",
      name: "Burger 1",
      quantity: 0,
      price: 13.99,
    },
    {
      id: 1,
      image:
        "https://hips.hearstapps.com/del.h-cdn.co/assets/15/24/1600x1600/square-1434149709-burgers-05.jpg?resize=1200:*",
      name: "Burger 2",
      quantity: 0,
      price: 12.99,
    },
    {
      id: 2,
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2021/03/French-fries-b9e3e0c.jpg",
      name: "Fries 1",
      quantity: 0,
      price: 6.99,
    },
    {
      id: 3,
      image:
        "https://www.acouplecooks.com/wp-content/uploads/2022/06/Cheese-Fries-005.jpg",
      name: "Fries 2",
      quantity: 0,
      price: 8.99,
    },
    {
      id: 4,
      image:
        "https://marleysmenu.com/wp-content/uploads/2021/06/Peanut-Butter-Milkshake-Feature-Image.jpg",
      name: "Milkshake 1",
      quantity: 0,
      price: 11.99,
    },
    {
      id: 5,
      image:
        "https://minimalistbaker.com/wp-content/uploads/2022/04/Strawberry-Milkshake-SQUARE.jpg",
      name: "Milkshake 2",
      quantity: 0,
      price: 11.99,
    },
    {
      id: 6,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Strawberry_ice_cream_cone_%285076899310%29.jpg/640px-Strawberry_ice_cream_cone_%285076899310%29.jpg",
      name: "Desert 1",
      quantity: 0,
      price: 5.99,
    },
    {
      id: 7,
      image:
        "https://foodal.com/wp-content/uploads/2017/03/Easy-Chocolate-Cake-FB.jpg",
      name: "Desert 2",
      quantity: 0,
      price: 7.99,
    },
    {
      id: 8,
      image:
        "https://leilawpb.com/wp-content/uploads/2020/05/sodas-to-go-650x650.jpg",
      name: "Drink 1",
      quantity: 0,
      price: 5.99,
    },
    {
      id: 9,
      image:
        "https://grandbaby-cakes.com/wp-content/uploads/2020/01/New-Orleans-Hurricane-Drink-2.jpg",
      name: "Drink 2",
      quantity: 0,
      price: 12.99,
    },
  ];

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
    <>
      <ScrollView
        style={{ backgroundColor: "#f0f0f0", flex: 1, marginTop: 35 }}
      >
        {/* Location & profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Ionicons name="location-sharp" size={26} color="#D2122E" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>The Restaurant</Text>
            <Text selectable={true}>123 Restaurant rd Sugar Land, Texas 77498</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 6 }}
          >
            <Ionicons name="person-outline" size={35} color="#088f8f" />
          </Pressable>
        </View>

        {/* Search bar */}
        {/*<View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#c0c0c0",
            borderRadius: 6,
          }}
        >
          <TextInput placeholder="Search" />
          <FontAwesome name="search" size={24} color="#D2122E" />
        </View>*/}

        {/* Image carousel */}
        <Carousel />

        {/* Categories */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600",marginTop:5 }}>Categories</Text>
          <ScrollView horizontal persistentScrollbar={true}>
            {categories.map((category, index) => (
              <Pressable
                key={index}
                onPress={() => setCategory(category)}
                style={{
                  margin: 10,
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor:
                    category.name === categorySelected ? "#088f8f" : "white",
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

        {/* Products */}
        {productsLoading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={{ margin: 10, marginTop: 30 }}>Loading Products</Text>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          filteredProducts.map((prod, index) => (
            <Product product={prod} key={index} />
          ))
        )}
      </ScrollView>

      {totalCost == 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088f8f",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              {totalItems > 1
                ? `${totalItems} items | $${totalCost}`
                : `${totalItems} item | $${totalCost}`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Additional charges may apply
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Pickup")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Go to Pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
