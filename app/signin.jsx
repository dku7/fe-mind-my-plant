import { View, Text, ImageBackground } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
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
        console.log('signin', currentUser[0]);
        localStorage.setItem("user_id", currentUser[0].user_id);
      } else setErrorMsg("Sorry, sign-in details incorrect");
    });
  };

  if (loggedInUser) return <Redirect href="/" />;

  return (
    <SafeAreaView>
      <View className="mt-24 px-16 flex">
        <TextInput
          className="border rounded-md p-1 mb-4 text-lg"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <TextInput
          className="border rounded-md p-1 text-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Pressable
          className="mt-12 mx-16 py-2 border-green-700  rounded-md bg-green-700 text-gray-200 font-bold"
          disabled={!user || !password}
          onClick={userAuthentication}
        >
          Sign In
        </Pressable>
        <Text className="text-center mt-4 text-lg">{errorMsg}</Text>
      </View>
    </SafeAreaView>
  );
};

export default signin;
