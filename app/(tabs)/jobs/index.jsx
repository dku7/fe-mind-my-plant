import { View, Text, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import JobCard from "./JobCard";
import { deleteOwnerJob, getJobsList, getOwnersJobs } from "../../api";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useRole } from "../../contexts/role";
import { router } from "expo-router";

const jobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [ownerJobs, setOwnerJobs] = useState([]);
  const { userType } = useRole();

  const isOwner = userType === "owner";

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

  const deleteJob = (user_id, job_id) => {
    deleteOwnerJob(user_id, job_id);
    console.log("delete", user_id, job_id);
  };

  return (
    <ScrollView className="flex items-center">
      {isOwner ? (
        <>
          <View className="my-5">
            <Button
              onPress={() => {
                router.push("/jobs/addjobs");
              }}
              title="Add New Job"
              color="#6A994E"
              className=" mx-5 px-6 py-2  rounded-md  shadow-md font-bold font-custom justify-center items-center flex"
            >
              <Text>Add New Job</Text>
            </Button>
          </View>
          <View className="flex items-center">
            {ownerJobs.map((job) => {
              const userId = job.owner_id;
              const jobId = job.job_id;
              return (
                <>
                  <JobCard job={job} key={userId} />
                  <Pressable
                    className="mb-12 mt-0 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] items-center shadow-md"
                    onPress={() => deleteJob(userId, jobId)}
                  >
                    <Text className="text-gray-50 font-bold font-custom ">
                      DELETE JOB
                    </Text>
                  </Pressable>
                </>
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
