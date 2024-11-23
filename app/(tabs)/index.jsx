import { View, Text, Pressable, ImageBackground, Image} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import SignIn from "../signin";
import { SafeAreaView } from "react-native-safe-area-context";
import aloePlant from "../../assets/images/MMPimg.png";
import { StyleSheet } from "nativewind";

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
  let avatarImg;
  if (loggedInUser) {
    avatarImg = loggedInUser.avatar_url;
  }

  return (
    <SafeAreaView className="flex">
      <View>
        {loggedInUser ? (
          <>
            <Text className="mt-3 ml-3 text-xl font-custom">
              Welcome Back {loggedInUser.username}
            </Text>
            <View style={styles.pressable}>
              <Link href="../profile" asChild>
                <Pressable s>
                  <Image source={{ uri: avatarImg }} style={styles.avatar} />
                </Pressable>
              </Link>
            </View>
          </>
        ) : (
          <SafeAreaView style={styles.container}>
            <Image source={aloePlant} style={styles.background}/>
            <View className="mt-1">
              <SignIn />
              </View>
          </SafeAreaView>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  pressable: {
    position: "absolute",
    top: 50,
    left: 50,
    backgroundColor: "red",
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
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
  text: {
    fontFamily: 'DM Sans'
  }
});
