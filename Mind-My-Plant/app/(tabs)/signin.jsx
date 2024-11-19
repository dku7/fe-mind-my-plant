import { View, Text } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { getUserList } from "../api";
import { LoggedInUserContext } from "../contexts/loggedInUser";

const signin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const userAuthentication = () => {
    getUserList()
      .then((users) => {
        const currentUser = users.filter((eachUser) => {
          return eachUser.username === user && eachUser.password === password;
        });
        setLoggedInUser(currentUser[0]);
      })
      .then(() => {
        console.log(loggedInUser);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={userAuthentication}>Sign In</button>
      </View>
    </SafeAreaView>
  );
};

export default signin;

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
