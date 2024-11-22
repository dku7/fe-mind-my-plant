import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const JobCard = ({ job }) => {
  const cardClassName =
    job.last_minute === "TRUE"
      ? "bg-[rgb(125,85,22)] m-4 p-3 rounded-xl"
      : "bg-[#167d29] m-4 p-3 rounded-xl";

  return (
    <SafeAreaView className="bg-white">
      <View className={cardClassName}>
          <Text className="text-lg text-gray-200">
            <Entypo
              className="ml-1 pr-2"
              name="location-pin"
              size={24}
              color="black"
            />
            {job.city}
          </Text>
          <Text className="text-lg text-gray-200">
            <Text className="text-lg text-gray-200 font-bold">
              <Foundation
                className="ml-2 pr-3"
                name="calendar"
                size={24}
                color="black"
              />
            </Text>
            {new Date(job.start_date).toLocaleDateString()} -{" "}
            {new Date(job.end_date).toLocaleDateString()}
          </Text>
          <Text className="text-lg text-gray-200">
            <FontAwesome5
              className="ml-1 pr-2"
              name="money-bill-wave"
              size={18}
              color="black"
            />
            £ {job.daily_rate}
          </Text>
          <Text className="text-lg text-gray-200">
            <Entypo
              className="ml-1 pr-2"
              name="location-pin"
              size={24}
              color="black"
            />
            {`${job.job_length} day${job.job_length === 1 ? "" : "s"} `}
          </Text>
          <Text className="text-lg text-gray-200">
            <MaterialCommunityIcons
              className="ml-1 pr-2"
              name="flower"
              size={24}
              color="black"
            />
            {`${job.number_of_plants} plant${
              job.number_of_plants === 1 ? "" : "s"
            } `}
          </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
});

export default JobCard;
