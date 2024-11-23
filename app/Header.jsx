import React from "react";
import { Image } from "expo-image";
import { StyleSheet } from "nativewind";

export default function NewHeader() {
  return (
    <Image
      style={{height: 80}}
      source={require("@/assets/images/header.png")}
    />
  );
}