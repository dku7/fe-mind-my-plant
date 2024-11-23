import { View, Text} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { getUserList } from "./api";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import { Redirect } from "expo-router";
import { Link } from "expo-router";


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
      } else setErrorMsg("Sorry, your sign-in details are incorrect");
    });
  };

  if (loggedInUser) return <Redirect href="/" />;

  return (
    <SafeAreaView>
      <View className="mt-2 px-16 flex">
        <TextInput
          className="border rounded-md p-1 mb-4 text-lg font-custom"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <TextInput
          className="border rounded-md p-1 text-lg font-custom"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </View>
        <View className="flex-row justify-center mt-4 ">
        <Pressable
          className="mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom"
          disabled={!user || !password}
          onClick={userAuthentication}
        >
          Sign In
        </Pressable>
              <Link href="../components/registration" asChild>
                <Pressable className="mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom">
                  Sign Up
                </Pressable>
              </Link>
            </View >
            <Text className="text-center mt-1 text-lg font-custom">{errorMsg}</Text>
    </SafeAreaView>
  );
};

export default signin;
