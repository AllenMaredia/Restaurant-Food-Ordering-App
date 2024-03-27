import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const Product = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(props.product));
    dispatch(incrementQty(props.product));
  };

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#f8f8f8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            style={{ width: 70, height: 70, borderRadius: 8 }}
            source={{ uri: props.product.image }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 82,
              fontSize: 16,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            {props.product.name}
          </Text>
          <Text style={{ width: 60, color: "gray", fontSize: 15 }}>
            ${props.product.price}
          </Text>
        </View>

        {cart.some((c) => c.id === props.product.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(props.product));
                dispatch(decrementQty(props.product));
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#bebebe",
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088f8f",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088f8f",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {/*props.product.quantity*/}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(props.product));
                dispatch(incrementQty(props.product));
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#bebebe",
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088f8f",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 1,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                borderRadius: 6,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
