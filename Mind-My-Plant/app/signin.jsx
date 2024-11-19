import { View, Text } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { getUserList } from "./api";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import { Redirect } from "expo-router";

const signin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const userAuthentication = () => {
    setErrorMsg("");
    getUserList().then((users) => {
      const currentUser = users.filter((eachUser) => {
        return eachUser.username === user && eachUser.password === password;
      });
      if (currentUser.length > 0) {
        setLoggedInUser(currentUser[0]);
        localStorage.setItem("user_id", currentUser[0].user_id);
      } else setErrorMsg("Sorry, sign-in details incorrect");
    });
  };

  if (loggedInUser) return <Redirect href="/" />;

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
        <button disabled={!user || !password} onClick={userAuthentication}>
          Sign In
        </button>
        <Text>{errorMsg}</Text>
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
