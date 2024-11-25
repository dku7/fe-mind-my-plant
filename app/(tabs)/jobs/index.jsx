import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import JobCard from "./JobCard";
import { getJobsList, getOwnersJobs } from "../../api";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useRole } from "../../contexts/role";


const jobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [ownerJobs, setOwnerJobs] = useState([]);
  const {userType} = useRole()


  useEffect(() => {
    getJobsList().then((response) => {
      setCurrentJobs(response);
    });
  }, []);

  useEffect(() => {
    getOwnersJobs(loggedInUser.user_id).then((response) => {
      setOwnerJobs(response);
    });
  }, []);

  return (
    <ScrollView className="flex items-center">
      {console.log(userType)}
      
      {userType === 'owner' ? (
        <>
          <View className="my-3">
            <Link className="items-center" href="jobs/addjobs">
              <Pressable className=" mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 shadow-md font-bold font-custom justify-center items-center flex">
                Add New Job
              </Pressable>
            </Link>
          </View>
          <View className="flex items-center">
            {ownerJobs.map((job) => {
              const userId = job.owner_id;
              const jobId = job.job_id;
              return (
                <Link href={`/jobs/${userId}/${jobId}`}>
                  <JobCard job={job} key={job.job_id} />
                </Link>
              );
            })}
          </View>
        </>
      ) : (
        <>
          <View className="mt-5 flex items-center">
            <Text className="font-custom text-xl">
              {loggedInUser?.username}, please find a list of jobs below
            </Text>
          </View>
          <View className="flex items-center">
            {currentJobs.map((job) => {
              const userId = job.owner_id;
              const jobId = job.job_id;
              return (
                <Link href={`/jobs/${userId}/${jobId}`}>
                  <JobCard job={job} key={job.job_id} />
                </Link>
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default jobs;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "white",
//   },
//   inputcontainer: {
//     flexDirection: "column",
//     width: "100%",
//     alignItems: "center",
//     pointerEvents: "auto",
//   },
//   input: {
//     flex: 1,
//     borderColor: "black",
//     borderWidth: 1,
//     borderRadius: 5,
//     alignItems: "center",
//     fontSize: 18,
//   },
// });
