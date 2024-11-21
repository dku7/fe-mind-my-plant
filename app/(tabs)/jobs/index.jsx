import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import { SafeAreaView } from "react-native-safe-area-context";
import JobCard from "./JobCard";

import { getJobsList } from "../../api";
import { ScrollView } from "react-native-gesture-handler";

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
      </View>
      {currentJobs.map((job) => {
        return <JobCard job={job} key={job.job_id} />;
      })}
    </ScrollView>
  );
};

export default jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#88CC7F",
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