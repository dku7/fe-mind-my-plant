import { View, Text, Pressable, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import loadingDisplay from "../components/loading-display";
import SignIn from "../signin";
import { SafeAreaView } from "react-native-safe-area-context";
import aloePlant from "../../assets/images/aloe-aloe-plant.gif"



const index = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const savedUserId = localStorage.getItem("user_id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserList().then((users) => {
      if (savedUserId !== undefined) {
        const currentUser = users.filter((eachUser) => {
          return eachUser.user_id == savedUserId;
        });
        setLoggedInUser(currentUser[0]);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <loadingDisplay />;

  return (
    <SafeAreaView className="flex">
      <View>

        {loggedInUser ? (
          <>
            <Text className="mt-3 ml-3 text-xl">
              Welcome Back {loggedInUser.username}
            </Text>
            <Link href="../profile" asChild>
              <Pressable>
                <Text>Profile</Text>
              </Pressable>
            </Link>
          </>

        ) : (
          <>
          <ImageBackground 
      source={aloePlant}/>
            <View className="mt-64">
              <SignIn />
            </View>
            <View className="mt-1 px-16 flex text-center">
              <Link href="../components/registration" asChild>
                <Pressable className="mt-1 mx-16 py-2 border-green-700 rounded-md bg-green-700 text-gray-200 font-bold">
                  Sign Up
                </Pressable>
              </Link>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;
