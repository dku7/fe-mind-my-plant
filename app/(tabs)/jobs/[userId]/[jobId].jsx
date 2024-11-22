import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, View, Pressable } from "react-native";
import { getOwnerPlants } from "@/app/api";
import { getJobById, postJobRequest } from "@/app/api";
import { useLocalSearchParams } from "expo-router";
import { LoggedInUserContext } from "@/app/contexts/loggedInUser";

const JobDetails = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userPlants, setUserPlants] = useState({});
  const [requests, setRequests] = useState(0);
  const { userId, jobId } = useLocalSearchParams();
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handlePostRequest = () => {
    setFeedbackMsg("Posting application...");
    setRequests((curRequests) => {
      return curRequests + 1;
    });

    postJobRequest(loggedInUser.user_id, jobId)
      .then((response) =>
        setFeedbackMsg("Your application has been posted successfully.")
      )
      .catch((error) => {
        setRequests((curRequests) => {
          return curRequests - 1;
        });

        setFeedbackMsg("Unable to post your application.");
      });
  };

  useEffect(() => {
    const promises = [getJobById(userId, jobId), getOwnerPlants(userId)];
    setFeedbackMsg("");

    setIsLoading(true);
    setError("");
    Promise.all(promises)
      .then((results) => {
        setJob(results[0]);
        setRequests(results[0].no_of_requests);
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
        <Text className="text-lg  w-full mb-1">Location: {job.city}</Text>
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
        <Text className="text-lg  w-full mb-1">
          Looking after{" "}
          {userPlants.map(
            (plant) => `${plant.quantity} x ${plant.common_name}  `
          )}
        </Text>
        <Text className="text-lg  w-full mb-1">
          Job instructions: {job.job_instructions}
        </Text>
        <Text className="text-lg  w-full mb-1">
          Number of reqests: {requests}
        </Text>
        <Pressable
          onPress={handlePostRequest}
          className="mt-12 py-2 border-green-700 w-32 text-center rounded-md bg-green-700 text-lg text-gray-200 font-bold"
        >
          Apply
        </Pressable>
        <Text>{feedbackMsg}</Text>
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;
