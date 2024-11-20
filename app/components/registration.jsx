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
  const [isPosting, setIsPosting] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isValidMsg, setIsValidMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState("");

  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const onChange = (e) => {
    setRegistrationDetails({
      ...registrationDetails,
      [e.target.placeholder]: e.target.value,
    });
    if (
      registrationDetails.username.length > 0 &&
      registrationDetails.password.length > 0 &&
      registrationDetails.email.length > 0 &&
      registrationDetails.first_name.length > 0 &&
      registrationDetails.last_name.length > 0
    ) {
      setIsValid(true);
    }
  };

  const handleRegistrationSubmit = () => {
    if (
      registrationDetails.username.length > 0 &&
      registrationDetails.password.length > 0 &&
      registrationDetails.email.length > 0 &&
      registrationDetails.first_name.length > 0 &&
      registrationDetails.last_name.length > 0
    ) {
      setIsErrorMsg("");
      setIsPosting("Registering...");
      registerUser(registrationDetails)
        .then((newUser) => {
          setLoggedInUser(newUser);
          localStorage.setItem("user_id", newUser.user_id);
          setIsPosting("");
          setIsValidMsg("");
          return newUser;
        })
        .catch((statusCode) => {
          if (statusCode === 409) {
            setIsErrorMsg("Username or Email already exists");
            setIsPosting("");
          } else {
            setIsErrorMsg(
              "Error: Unable to create account. Please try again later."
            );
            setIsPosting("");
          }
        });
    } else {
      setIsValid(false);
      setIsValidMsg("Please fill out all fields to register!");
      setIsErrorMsg("");
      setIsPosting("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loggedInUser && (
        <View style={styles.inputcontainer}>
          <>
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
            />
            <TextInput
              style={styles.input}
              type="text"
              onChange={onChange}
              placeholder="username"
              name="username"
              value={registrationDetails.username}
              aria-required="true"
            />
            <TextInput
              style={styles.input}
              type="text"
              onChange={onChange}
              placeholder="password"
              name="password"
              value={registrationDetails.password}
              aria-required="true"
            />
            <Pressable onPress={handleRegistrationSubmit}>
              <Text>Register</Text>
            </Pressable>
          </>
        </View>
      )}

      {!isValid && <Text>{isValidMsg}</Text>}
      <Text>{isPosting}</Text>
      <Text>{isErrorMsg}</Text>

      {loggedInUser && (
        <View>
          <Text>Welcome to Mind My Plants, {loggedInUser?.first_name}</Text>
          <Link href="./" asChild>
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
