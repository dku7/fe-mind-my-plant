import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { registerUser } from "../api";

const registration = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.placeholder]: e.target.value,
    });
  };

  const handleRegistrationSubmit = () => {
    registerUser(registrationDetails).then((response) => {
      return response;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text>registration</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="first_name"
          name="first_name"
          value={registrationDetails.first_name}
        />
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="last_name"
          name="last_name"
          value={registrationDetails.last_name}
        />
        <TextInput
          style={styles.input}
          type="email"
          onChange={onChange}
          placeholder="email"
          name="email"
          value={registrationDetails.email}
        />
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="username"
          name="username"
          value={registrationDetails.username}
        />
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="password"
          name="password"
          value={registrationDetails.password}
        />
        <Pressable onPress={handleRegistrationSubmit}>
          <Text>Button</Text>
        </Pressable>
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
