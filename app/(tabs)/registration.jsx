import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { registerUser } from "../api";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { Link } from "expo-router";

const registration = () => {
  const [registrationDetails, setRegistrationDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  /*
  happy path :)
  - we post the new user and get a new user_id from api ✅
  - save the new user_id in localStorage ✅
  - set context for the new user ✅
  - display welcome message for the new user  ✅
  - show two buttons: ✅
  - 1) go home  ✅
  - 2) complete profile  ✅

  - add isPosting state
  - submit button should be disable if all the required fields are not input


  sad path :(
  - there is an error returned from api: 
  - check the status code:
  -   if code = 409 display 'username or email already exists' else generic error message
  */

  const onChange = (e) => {
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.placeholder]: e.target.value,
    });
  };

  const handleRegistrationSubmit = () => {
    registerUser(registrationDetails).then((newUser) => {
      console.log(newUser);

      setLoggedInUser(newUser);
      localStorage.setItem("user_id", newUser.user_id);

      return newUser;
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
          <Text>Register</Text>
        </Pressable>
      </View>

      {loggedInUser && (
        <View>
          <Text>Welcome to Mind My Plants, {loggedInUser?.first_name}</Text>
          <Link href="./index" asChild>
            <Pressable>
              <Text>Go to Homepage</Text>
            </Pressable>
          </Link>
          <Link href="../profile" asChild>
            <Pressable>
              <Text>Complete My Profile</Text>
            </Pressable>
          </Link>
        </View>
      )}
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
