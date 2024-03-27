import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [pickupInfo, setPickupInfo] = useState([]);
  const [pickup, setPickup] = useState([]);

  useEffect(() => {
    getName();
    getRecentOrder();
  }, []);

  const getName = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data().name);
      setName(docSnap.data().name);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const getRecentOrder = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setOrders(docSnap.data().orders);
      setItems(Object.keys(docSnap.data().orders));
      setPickupInfo(docSnap.data().pickupDetails);
      setPickup(Object.keys(docSnap.data().pickupDetails));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={{ marginTop: 40, marginLeft: 10 }}>
        <Ionicons
          onPress={() => navigation.navigate("Home")}
          name="arrow-back"
          size={34}
          color="black"
        />
      </View>
      <View style={{}}>
        <View style={{ paddingBottom: 40 }}>
          <View
            style={{
              marginVertical: 10,
              paddingBottom: 40,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Welcome, {name}
            </Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "400", padding:10 }}>
            Your Recent Order:
          </Text>
          <View style={{ alignItems: "center" }}>
            {items.map((prod, index) => (
              <Text style={{ fontSize: 16, fontWeight: "400", padding:2 }} key={index}>
                {orders[prod].name} x{orders[prod].quantity}
              </Text>
            ))}
          </View>
          <Text style={{ fontSize: 18, fontWeight: "400",paddingVertical:10, paddingLeft:25 }}>
            Pickup Details:
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "400", padding:2 }}>
              Name: {pickupInfo["name"]}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", padding:2 }}>
              Date: {pickupInfo["pickupDate"]}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "400", padding:2 }}>
              Time: {pickupInfo["selectedTime"]}
            </Text>
          </View>

          <Pressable
            onPress={signOutUser}
            style={{
              width: 100,
              backgroundColor: "#088f8f",
              padding: 15,
              borderRadius: 8,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
