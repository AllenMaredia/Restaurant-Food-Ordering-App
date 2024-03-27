import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pickupDate, setPickupDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date(Date.now()));
  const [pickupTime, setPickupTime] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const totalItems = cart
    .map((item) => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const goToCart = () => {
    if (!pickupDate || !pickupTime || !name) {
      Alert.alert("Invalid Input", "Please enter all fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      if (pickupDate && selectedTime && name) {
        navigation.navigate("Cart", {
          name: name,
          selectedTime: pickupTime,
          pickupDate: pickupDate,
        });
      }
    }
  };

  const toggleDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const toggleTimepicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const dateChanged = ({ type }, newDate) => {
    if (type == "set") {
      setSelectedDate(newDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setPickupDate(newDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };
  const timeChanged = ({ type }, newTime) => {
    if (type == "set") {
      setSelectedTime(newTime);

      if (Platform.OS === "android") {
        toggleTimepicker();
        formattedTime = `${newTime.getHours()}':'${newTime.getMinutes()}`;
        if (newTime.getHours() > 12) {
          formattedTime = (newTime.getHours() - 12).toString() + ":";

          if (newTime.getMinutes() < 10) {
            formattedTime = formattedTime + "0" + newTime.getMinutes();
          } else {
            formattedTime = formattedTime + newTime.getMinutes();
          }
          formattedTime = formattedTime + " PM";
        } else {
          formattedTime = newTime.getHours().toString() + ":";

          if (newTime.getMinutes() < 10) {
            formattedTime = formattedTime + "0" + newTime.getMinutes();
          } else {
            formattedTime = formattedTime + newTime.getMinutes();
          }
          formattedTime = formattedTime + " AM";
        }
        setPickupTime(formattedTime);
      }
    } else {
      toggleTimepicker();
    }
  };

  const confirmIOSDate = () => {
    setPickupDate(selectedDate.toDateString());
    toggleDatepicker();
  };
  const confirmIOSTime = () => {
    formattedTime = `${selectedTime.getHours()}':'${selectedTime.getMinutes()}`;
    if (selectedTime.getHours() > 12) {
      formattedTime = (selectedTime.getHours() - 12).toString() + ":";

      if (selectedTime.getMinutes() < 10) {
        formattedTime = formattedTime + "0" + selectedTime.getMinutes();
      } else {
        formattedTime = formattedTime + selectedTime.getMinutes();
      }
      formattedTime = formattedTime + " PM";
    } else {
      formattedTime = selectedTime.getHours().toString() + ":";

      if (selectedTime.getMinutes() < 10) {
        formattedTime = formattedTime + "0" + selectedTime.getMinutes();
      } else {
        formattedTime = formattedTime + selectedTime.getMinutes();
      }
      formattedTime = formattedTime + " AM";
    }
    setPickupTime(formattedTime);
    toggleTimepicker();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never" keyboardDismissMode="on-drag" contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
      <View style={{ marginTop: 40 }}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="black"
          style={{ marginLeft: 5, marginBottom: 5 }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Enter your name
        </Text>
        <TextInput
          style={{
            padding: 14,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 7,
            borderRadius: 8,
            margin: 10,
          }}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <View>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Pickup date
          </Text>

          {showDatePicker &&
            (Platform.OS === "ios" ? (
              <>
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={selectedDate}
                  onChange={dateChanged}
                  style={{ height: 120, marginTop: -10 }}
                  minimumDate={new Date()}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                      marginTop: 10,
                      marginBottom: 15,
                      paddingHorizontal: 20,
                      backgroundColor: "lightgray",
                    }}
                    onPress={toggleDatepicker}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#088f8f",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                      marginTop: 10,
                      marginBottom: 15,
                      paddingHorizontal: 20,
                      backgroundColor: "#088f8f",
                    }}
                    onPress={confirmIOSDate}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <TextInput
                  style={{
                    padding: 14,
                    borderColor: "gray",
                    borderWidth: 0.7,
                    paddingVertical: 7,
                    borderRadius: 8,
                    margin: 10,
                  }}
                />
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={selectedDate}
                  onChange={dateChanged}
                  minimumDate={new Date()}
                />
              </>
            ))}
          {!showDatePicker && (
            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={{
                  padding: 14,
                  borderColor: "gray",
                  borderWidth: 0.7,
                  paddingVertical: 7,
                  borderRadius: 8,
                  margin: 10,
                }}
                placeholder="Choose Date"
                value={pickupDate}
                onChangeText={setPickupDate}
                editable={false}
                color="black"
                onPressIn={toggleDatepicker}
              />
            </Pressable>
          )}
        </View>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Select Time
        </Text>

        {showTimePicker &&
          (Platform.OS === "ios" ? (
            <>
              <DateTimePicker
                mode="time"
                display="spinner"
                value={selectedTime}
                onChange={timeChanged}
                style={{ height: 120, marginTop: -10 }}
                minuteInterval={5}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    marginTop: 10,
                    marginBottom: 15,
                    paddingHorizontal: 20,
                    backgroundColor: "lightgray",
                  }}
                  onPress={toggleTimepicker}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#088f8f",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    marginTop: 10,
                    marginBottom: 15,
                    paddingHorizontal: 20,
                    backgroundColor: "#088f8f",
                  }}
                  onPress={confirmIOSTime}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TextInput
                style={{
                  padding: 14,
                  borderColor: "gray",
                  borderWidth: 0.7,
                  paddingVertical: 7,
                  borderRadius: 8,
                  margin: 10,
                }}
              />
              <DateTimePicker
                mode="time"
                display="spinner"
                value={selectedTime}
                onChange={timeChanged}
                minuteInterval={5}
              />
            </>
          ))}
        {!showTimePicker && (
          <Pressable onPress={toggleTimepicker}>
            <TextInput
              style={{
                padding: 14,
                borderColor: "gray",
                borderWidth: 0.7,
                paddingVertical: 7,
                borderRadius: 8,
                margin: 10,
              }}
              placeholder="Choose Time"
              value={pickupTime}
              onChangeText={setPickupTime}
              editable={false}
              color="black"
              onPressIn={toggleTimepicker}
            />
          </Pressable>
        )}
      </View>
      {total == 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088f8f",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            marginTop: '50%',
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
                ? `${totalItems} items | $${total}`
                : `${totalItems} item | $${total}`}
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

          <Pressable onPress={goToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Go to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </ScrollView>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({});
