import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useContext } from "react";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { Link } from "expo-router";

const addjobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const handleJobSubmit = () => {};

  return (
    <SafeAreaView>
      {loggedInUser && (
        <View>
          <>
            <Text>Add Job</Text>
            <TextInput type="text" placeholder="Start Date" name="start_date" />
            <TextInput type="text" placeholder="End Date" name="end_date" />
            <TextInput
              type="email"
              placeholder="Daily Rate"
              name="daily_rate"
            />
            <TextInput
              type="text"
              placeholder="Job Description"
              name="job_description"
              aria-required="true"
            />
            <Pressable onPress={handleJobSubmit}>
              <Text>Add Job</Text>
            </Pressable>
          </>
        </View>
      )}

      {!isValid && <Text>{isValidMsg}</Text>}
      <Text>{isPosting}</Text>
      <Text>{isErrorMsg}</Text>

      {!loggedInUser && (
        <View>
          <Text>Welcome to Mind My Plants, {loggedInUser?.first_name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default addjobs;
