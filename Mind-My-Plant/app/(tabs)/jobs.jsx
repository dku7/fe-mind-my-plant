import { View, Text } from "react-native";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { SafeAreaView } from "react-native-safe-area-context";

const jobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text>jobs {loggedInUser?.username}</Text>
      </View>
    </SafeAreaView>
  );
};

export default jobs;

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
