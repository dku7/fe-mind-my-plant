import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import loadingDisplay from "../components/loading-display";

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
    <>
      <View>
        <Text className="font-bold text-5xl pt-4 pb-5 bg-green-900 text-white text-center">
          Mind My Plants
        </Text>
        {loggedInUser ? (
          <Text className="mt-3 ml-3 text-xl">
            Welcome Back {loggedInUser.username}
          </Text>
        ) : (
          <View className="p-4 ">
            <Link href="./registration" asChild>
              <Pressable className="border w-24 rounded-md py-1 px-4 mb-3 bg-green-700 text-center text-base text-gray-200 border-green-700">
                Sign Up
              </Pressable>
            </Link>

            <Link href="../signin" asChild>
              <Pressable className="border w-24 rounded-md py-1 px-4 mb-3 bg-green-700 text-center text-base text-gray-200 border-green-700">
                Sign In
              </Pressable>
            </Link>
          </View>
        )}
      </View>
    </>
  );
};

export default index;
