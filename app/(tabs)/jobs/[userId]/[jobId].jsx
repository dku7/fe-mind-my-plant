import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, View, Pressable } from "react-native";
import { getOwnerPlants } from "@/app/api";
import { getJobById, postJobRequest } from "@/app/api";
import { useLocalSearchParams } from "expo-router";
import { LoggedInUserContext } from "@/app/contexts/loggedInUser";
import { StyleSheet } from "react-native";
import { Image } from "react-native";

const JobDetails = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userPlants, setUserPlants] = useState({});
  const [requests, setRequests] = useState(0);
  const { userId, jobId } = useLocalSearchParams();
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const applicationSuccessful =
    "Your application has been posted successfully.";

  const handlePostRequest = () => {
    setFeedbackMsg("Posting application...");
    setRequests((curRequests) => {
      return curRequests + 1;
    });

    postJobRequest(loggedInUser.user_id, jobId)
      .then((response) => setFeedbackMsg(applicationSuccessful))
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

  if (isLoading) return <Text className="font-custom ml-3">Loading....</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <SafeAreaView>
      <View>
        <View className="flex m-6 rounded-lg shadow-xl p-5">
            <Text className="font-custom text-base">Owner: {job.owner_first_name}</Text>
            <Text className="font-custom text-base">Location: {job.city}</Text>
            <Text className="font-custom text-base">
              Dates: {new Date(job.start_date).toLocaleDateString()} -{" "}
              {new Date(job.end_date).toLocaleDateString()}
            </Text>
            <Text className="font-custom text-base">Daily rate: £{job.daily_rate}</Text>
            <Text className="font-custom text-base">
              {`${job.job_length ?? 0} day${job.job_length === 1 ? "" : "s"} `}
            </Text>
            <Text className="font-custom text-base">
              {`${job.number_of_plants ?? 0} plant${
                job.number_of_plants === 1 ? "" : "s"
              } `}
            </Text>

        </View>
        <View className="font-custom text-base m-6 mb-3 ">
          <Text>Looking after {"\n"} </Text>
          {userPlants.map(
            (plant) => {
              return <>
              <Text>{plant.quantity} x {plant.common_name} </Text> 
            <Image source={plant.image_url} style={styles.image} />    </>}
          
          )}
        </View>
        <Text className="font-custom text-base mb-3 ml-6">
          Job instructions: 
          {"\n"}
            {job.job_instructions}
        </Text>

        <Pressable
          onPress={handlePostRequest}
          disabled={feedbackMsg === applicationSuccessful}
          className={
            feedbackMsg === applicationSuccessful
              ? "mx-6 px-12 py-2 border-[#386641] rounded-md bg-[#386641] text-gray-50 font-bold font-custom shadow-md text-center"
              : "mx-6 px-12 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom shadow-md text-center"
          }
        >
          Apply
        </Pressable>
        <Text className="ml-5 mt-3 font-custom text-base font-semibold">
          Number of applications: {requests}
        </Text>
        <Text className="ml-5 mt-3 font-custom text-base font-semibold">{feedbackMsg}</Text>
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;


const styles = StyleSheet.create( {
  image: {
    height: 50,
    width: 50
  }
})