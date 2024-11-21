import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { getJobById } from "@/app/api";

const JobDetails = () => {
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const owner_id = 1;
  const job_id = 21;

  useEffect(() => {
    setIsLoading(true);
    setError("");

    getJobById(owner_id, job_id)
      .then((job) => {
        setJob(job);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  if (isLoading) return <Text>Loading....</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <SafeAreaView>
      <Text className="font-bold text-5xl pt-4 pb-5 bg-green-900 text-lg text-white text-lg text-center mb-10">
        Job Details
      </Text>
      <View className="text-lg flex-row flex-wrap justify-center">
        <Text className="text-lg text-center w-full mb-1">
          Owner: {job.owner_first_name}
        </Text>
        <Text className="text-lg text-center w-full mb-1">
          Location: {job.city}
        </Text>
        <Text className="text-lg text-center w-full mb-1">
          Dates: {new Date(job.start_date).toLocaleDateString()} -{" "}
          {new Date(job.end_date).toLocaleDateString()}
        </Text>
        <Text className="text-lg text-center w-full mb-1">
          Daily rate: £ {job.daily_rate}
        </Text>
        <Text className="text-lg text-center w-full mb-1">
          {`${job.job_length ?? 0} day${job.job_length === 1 ? "" : "s"} `}
        </Text>
        <Text className="text-lg text-center w-full mb-1">
          {`${job.number_of_plants ?? 0} plant${
            job.number_of_plants === 1 ? "" : "s"
          } `}
        </Text>
        <Text className="text-lg text-center w-full mb-1">
          {job.job_instructions}
        </Text>
        <Pressable className="mt-12 py-2 border-green-700 w-32 text-center rounded-md bg-green-700 text-lg text-gray-200 font-bold">
          Apply
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;
