import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { useContext } from "react";
import { getUserList } from "../api";
import { loadingDisplay } from "../components/loading-display";

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
    <View>
      <Text>Home</Text>
      {loggedInUser ? (
        <Text>Welcome Back {loggedInUser.username}</Text>
      ) : (
        <>
          <Link href="./registration" asChild>
            <Pressable>
              <Text>Sign Up</Text>
            </Pressable>
          </Link>

          <Link href="../signin" asChild>
            <Pressable>
              <Text>Sign In</Text>
            </Pressable>
          </Link>
        </>
      )}
    </View>
  );
};

export default index;
