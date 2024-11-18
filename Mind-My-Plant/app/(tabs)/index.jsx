import { View, Text, Pressable } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="./registration" asChild>
        <Pressable>
          <Text>Sign In/Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default index;
