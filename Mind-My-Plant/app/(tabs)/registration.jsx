import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { registerUser } from "../api";

const registration = () => {
  const [registrationDetails, setRegistrationDetails] = useState({});

  /*  const { username, firstname, surname, email, password, postcode, city } =
    registrationDetails; */

  const onChange = (e) => {
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.name]: e.target.value,
    });
    console.log(registrationDetails);
  };

  const handleRegistrationSubmit = () => {
    registerUser(registrationDetails).then((response) => {
      console.log(response);
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
          placeholder="firstname"
          name="firstname"
          value={registrationDetails.firstname}
        />
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="surname"
          name="surname"
          value={registrationDetails.surname}
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
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="postcode"
          name="postcode"
          value={registrationDetails.postcode}
        />
        <TextInput
          style={styles.input}
          type="text"
          onChange={onChange}
          placeholder="city"
          name="city"
          value={registrationDetails.city}
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
