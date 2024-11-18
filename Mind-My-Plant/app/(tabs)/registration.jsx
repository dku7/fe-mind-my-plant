import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const registration = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text>registration</Text>
        <TextInput style={styles.input} placeholder="First Name" />
        <TextInput style={styles.input} placeholder="Surname" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Phone Number" />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" />
        <TextInput style={styles.input} placeholder="Confirm Password" />
      </View>
    </SafeAreaView>
  );
};

export default registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#88CC7F",
  },
  inputcontainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    fontSize: 18,
  },
});
