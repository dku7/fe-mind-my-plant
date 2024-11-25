import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { getCareGuides } from "@/app/api";

const guide = () => {
  const { guide } = useLocalSearchParams();
  const [careGuideInfo, setCareGuideInfo] = useState([]);
  let currentGuide;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCareGuides().then((data) => {
      if (data !== undefined) {
        const currentGuide = data.filter((careGuide) => {
          return careGuide.title == guide;
        });
        setCareGuideInfo(currentGuide);
      }
      setIsLoading(false);
    });
  }, []);
  const finalGuide = careGuideInfo[0];

  if (!isLoading)
    return (
      <ScrollView className="mt-3 mx-3">
        <Button
          title="Back"
          onPress={() => {
            router.back();
          }}
        ></Button>
        <Text>{finalGuide.title}</Text>
        <Text>{finalGuide.body}</Text>
        <Image source={{ uri: finalGuide.img_url }} style={styles.image} />
      </ScrollView>
    );
};

export default guide;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
