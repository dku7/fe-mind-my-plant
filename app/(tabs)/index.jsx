import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import SignIn from "../Authentication/signin";
import { SafeAreaView } from "react-native-safe-area-context";

import aloePlant from "../../assets/images/MMPimg.png";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import { getUserId } from "../async-storage";
import { removeUserId } from "../async-storage";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";


import { Redirect } from "expo-router";

import CareGuides from "./Careguides";
import AsyncStorage from "@react-native-async-storage/async-storage";


const index = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [localUser, setLocalUser] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter()

  const handleSignOut = () => {
    setLoggedInUser({})
    router.replace("/Authentication/signin")
    removeUserId().then(()=> {
      console.log('removed ID in index')
    })
  }

  useEffect(()=> {
    getUserId().then((user_id)=> {
      setLocalUser(user_id)
    })
  },[])

  useEffect(() => {
    getUserList().then((users) => {
      if (localUser !== undefined) {
        const currentUser = users.filter((eachUser) => {
          return eachUser.user_id == localUser;
        });
      }
      setIsLoading(false);
    });
  }, []);



  if (isLoading) return <Text>Loading...</Text>
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

            <Link href="../profile" asChild>
              <Pressable>
                <Text>Profile</Text>
              </Pressable>
            </Link>
          </>
        ) : (
          <>
            <ImageBackground source={aloePlant} />
            <View className="mt-64">
              <SignIn />
            </View>
            <View className="mt-1 px-16 flex text-center">
              <Link href="../components/registration" asChild>
                <Pressable className="mt-1 mx-16 py-2 border-green-700 rounded-md bg-green-700 text-gray-200 font-bold">
                  Sign Up

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
