import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCareGuides } from "../../api";
import { router } from "expo-router";

const CareGuides = () => {
  const [careGuideInfo, setCareGuideInfo] = useState([]);

  useEffect(() => {
    getCareGuides().then((data) => {
      setCareGuideInfo(data);
    });
  }, [careGuideInfo]);

  return (
    <SafeAreaView>
      {careGuideInfo.map((careGuide) => {
        let careGuideImg = careGuide.img_url;
        let guide = careGuide.title;

        return (
          <Pressable
            onPress={() => {
              router.push(`/(tabs)/Careguides/${guide}`);
            }}
          >
            <View className="flex-col flex-wrap">
              <Text>{careGuide.title}</Text>
              <Image source={{ uri: careGuideImg }} style={styles.image} />
            </View>
          </Pressable>
        );
      })}
      <Text>CareGuides</Text>
    </SafeAreaView>
  );
};

export default CareGuides;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
