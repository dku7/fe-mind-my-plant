import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import SignIn from "../Authentication/signin";
import { SafeAreaView } from "react-native-safe-area-context";
import aloePlant from "../../assets/images/MMPimg.png";
import { StyleSheet } from "nativewind";
import { Button } from "react-native";
import { useRouter } from "expo-router";


import { Redirect } from "expo-router";

import CareGuides from "./Careguides";


const index = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const savedUserId = localStorage.getItem("user_id");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter()

  const handleSignOut = () => {
    setLoggedInUser({})
    localStorage.clear()
    router.push("/Authentication/signin")
  }

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
  let avatarImg;
  if (loggedInUser) {
    avatarImg = loggedInUser.avatar_url;
  }

  return (
    <SafeAreaView >
      <View className="mt-5">
        {loggedInUser ? (
          <>
            <Text className="mt-3 ml-8 text-xl font-custom">
              Welcome back, {loggedInUser.username}!
            </Text>
            <Pressable className="mx-5 ml-64 text-center justify-center h-10 w-24 border-[#D77F33] rounded-md bg-[#D77F33] text-gray-50 font-bold font-custom shadow-md" onPress={handleSignOut} title='Sign Out'>Sign Out</Pressable>
            <View className="ml-5" >
              <Link href="../profile" asChild>
                <Pressable >
                  <Image className='ml-3 shadow-md' source={{ uri: avatarImg }} style={styles.avatar} />
                </Pressable>
              </Link>
              <View className=" mt-5 w-80">
                <CareGuides />
              </View>
            </View>
          </>
        ) : (
          <Redirect href="/Authentication/signin" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "black",
  },
  pressable: {
    width: 100,
    height: 100,
  },
  text: {
    fontFamily: "DM Sans",
  },
  background: {
    flex: 1,
    height: 300,
    marginTop: 50,
    width: 300,
    borderRadius: 130,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
