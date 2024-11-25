import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import { getSitterJobs } from "./api";

const SitterProfile = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [description, setDescription] = useState(
    loggedInUser.description || ""
  );
  const [jobs, setJobs] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getSitterJobs(loggedInUser.user_id)
      .then((fetchedJobs) => {
        setJobs(fetchedJobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [loggedInUser.user_id]);

  const handleDescriptionUpdate = () => {
    console.log("need to figure out endpoint");
    setSuccessMsg("Description updated successfully!");
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sitter Profile</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Description:</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Tell others about yourself..."
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Pressable style={styles.button} onPress={handleDescriptionUpdate}>
        <Text style={styles.buttonText}>Update Description</Text>
      </Pressable>
      {successMsg ? <Text style={styles.successMsg}>{successMsg}</Text> : null}

      <Text style={styles.sectionTitle}>Your Jobs:</Text>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <View key={job.job_id} style={styles.card}>
            <Text style={styles.jobTitle}>Owner: {job.owner_first_name}</Text>
            <Text style={styles.jobDetails}>Start: {job.start_date}</Text>
            <Text style={styles.jobDetails}>End: {job.end_date}</Text>
            <Text style={styles.jobDetails}>
              Street Address: {job.street_address}
            </Text>
            <Text style={styles.jobDetails}>Daily Rate: {job.daily_rate}</Text>
            <Text style={styles.jobDetails}>Job Status: {job.status}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noJobsText}>No jobs found for your profile.</Text>
      )}
    </ScrollView>
  );
};

export default SitterProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",

    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    height: 100,
  },
  button: {
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successMsg: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  jobDetails: {
    fontSize: 14,
    marginTop: 4,
  },
  noJobsText: {
    fontSize: 16,
    textAlign: "center",
  },
});