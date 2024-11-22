import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useContext } from "react";
import { LoggedInUserContext } from "../../contexts/loggedInUser";
import { postUserJobs } from "../../../api";

const addjobs = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [jobBody, setJobBody] = useState({})
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dailyRate, setDailyRate] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [message, setMessage] = useState('')


  const handleJobSubmit = () => {
    setJobBody('')
      // if(jobBody.start_date && jobBody.end_date && jobBody.daily_rate && jobBody.jobDescription){
        postUserJobs(loggedInUser.user_id, {start_date: startDate, end_date: endDate, daily_rate: dailyRate, job_instructions: jobDescription}).then((response)=> {
          console.log(response, "in file")
        })
    //     else {
    //       setMessage('Please complete all fields')
    // }
   
   
  };
console.log(loggedInUser)
  return (
    <SafeAreaView>
      {loggedInUser && (
        <View className="mx-16">
            <Text className="font-bold text-2xl mb-5">Add Job</Text>

            <Text>Start Date</Text>
            <TextInput onChange={(e)=> setStartDate(e.target.value)} className="border rounded mb-4" type="date" placeholder="MM/DD/YYYY" name="start_date"  />
            <Text>End Date</Text>
            <TextInput onChange={(e)=> setEndDate(e.target.value)} className="border rounded mb-4" type="date" placeholder="DD/MM/YYYY" name="end_date" />
            <Text>Daily Rate (£)</Text>
            <TextInput onChange={(e)=> setDailyRate(e.target.value)} className="border rounded mb-4"
              type="number"
              placeholder="0"
              name="daily_rate"
            />
            <Text>Job Description</Text>
            <TextInput onChange={(e)=> setJobDescription(e.target.value)} className="border rounded mb-4 py-8"
              type="text"
              placeholder="(500)"
              name="job_description"
              aria-required="true"
            />
            <Pressable onPress={handleJobSubmit}>
              <Text>Add Job</Text>
              <Text>{message}</Text>
            </Pressable>
        </View>
      )}

      {/* {!isValid && <Text>{isValidMsg}</Text>} */}
      {/* <Text>{isPosting}</Text>
      <Text>{isErrorMsg}</Text> */}

      {!loggedInUser && (
        <View>
          <Text>Welcome to Mind My Plants, {loggedInUser?.first_name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default addjobs;
