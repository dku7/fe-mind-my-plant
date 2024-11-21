import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JobCard = ({ job }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Job ID: {job.job_id}</Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Owner: </Text>
        {job.owner_first_name} {job.owner_last_name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Location: </Text>
        {job.city}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Start Date: </Text>
        {new Date(job.start_date).toLocaleDateString()}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>End Date: </Text>
        {new Date(job.end_date).toLocaleDateString()}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Daily Rate: </Text>${job.daily_rate}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Status: </Text>
        {job.status === 1 ? "Active" : "Inactive"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Last Minute: </Text>
        {job.lastminute === "TRUE" ? "Yes" : "No"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Star Rating: </Text>
        {job.star_rating ? `${job.star_rating}/5` : "Not Rated"}
      </Text>
    </View>
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
