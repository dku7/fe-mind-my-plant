import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getOwnerPlants } from "@/app/api";

import { getJobById } from "@/app/api";
import { useLocalSearchParams } from "expo-router";

const JobDetails = () => {
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userPlants, setUserPlants] = useState({});

  const { userId, jobId } = useLocalSearchParams();


  useEffect(() => {
    const promises = [getJobById(userId, jobId), getOwnerPlants(userId)]

    setIsLoading(true);
    setError("")
    Promise.all(promises)
      .then((results) => {
          setJob(results[0])
          setUserPlants(results[1]);
            setIsLoading(false);    
      })
      .catch((error) => setError(error));
  }, [jobId, userId]);

  if (isLoading) return <Text>Loading....</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <SafeAreaView>
      <View className="text-lg ml-3">
        <Text className="text-lg w-full mb-1">
          Owner: {job.owner_first_name}
        </Text>
        <Text className="text-lg  w-full mb-1">
          Location: {job.city}
        </Text>
        <Text className="text-lg  w-full mb-1">
          Dates: {new Date(job.start_date).toLocaleDateString()} -{" "}
          {new Date(job.end_date).toLocaleDateString()}
        </Text>
        <Text className="text-lg  w-full mb-1">
          Daily rate: £ {job.daily_rate}
        </Text>
        <Text className="text-lg  w-full mb-1">
          {`${job.job_length ?? 0} day${job.job_length === 1 ? "" : "s"} `}
        </Text>
        <Text className="text-lg  w-full mb-1">
          {`${job.number_of_plants ?? 0} plant${
            job.number_of_plants === 1 ? "" : "s"
          } `}
        </Text>
        <Text className="text-lg  w-full mb-1">Looking after {userPlants.map((plant) => `${plant.quantity} x ${plant.common_name}  `)}</Text>
        <Text className="text-lg  w-full mb-1">
          Job instructions:{' '}
          {job.job_instructions}
        </Text>
        <Text className="text-lg  w-full mb-1">
            Number of reqests: {job.no_of_requests}
          </Text>
        <Pressable className="mt-12 py-2 border-green-700 w-32 text-center rounded-md bg-green-700 text-lg text-gray-200 font-bold">
          Apply
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;
