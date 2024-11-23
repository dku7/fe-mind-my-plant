import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import JobCard from "./JobCard";
import { getJobsList } from "../../api";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { Pressable } from "react-native";

const jobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [currentJobs, setCurrentJobs] = useState([]);

  useEffect(() => {
    getJobsList(21).then((response) => {
      setCurrentJobs(response);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text>jobs {loggedInUser?.username}</Text>
        <View>
        <Link href="jobs/addjobs"><Pressable className="mt-12 mx-16 py-2 border-green-700  rounded-md bg-green-700 text-gray-200 font-bold" >Add New Job</Pressable></Link>
      </View>
      </View>
      {currentJobs.map((job) => {
        const userId = job.owner_id;
        const jobId = job.job_id;
        return (
          <Link href={`/jobs/${userId}/${jobId}`}>
            <JobCard job={job} key={job.job_id} />
          </Link>
        );
      })}
    </ScrollView>
  );
};

export default jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  inputcontainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    fontSize: 18,
  },
});
