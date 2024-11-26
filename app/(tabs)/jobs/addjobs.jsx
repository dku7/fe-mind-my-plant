import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useContext } from "react";
import { LoggedInUserContext } from "../../contexts/loggedInUser"
import { postUserJobs } from "@/app/api";
import { router } from "expo-router";
import { getUserId } from "@/app/async-storage";

const addjobs = () => {

  const { loggedInUser } = useContext(LoggedInUserContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");
  let savedUserId


  useEffect(()=> {
    getUserId('user_id').then((id)=> {
      console.log(id, 'in use effect')
      savedUserId = id
    })
  },[])


  const theUser = loggedInUser? loggedInUser.user_id : savedUserId
  const handleJobSubmit = () => {
    if(startDate && endDate && dailyRate && jobDescription){
    postUserJobs((theUser), {
      start_date: startDate,
      end_date: endDate,
      daily_rate: dailyRate,
      job_instructions: jobDescription,
    }).then((response) => {
      setMessage("Job posted successfully")
    })}
        else {
          setMessage('Please complete all fields')
    }
  };

  return (
    <SafeAreaView>
      {theUser && (
        <View className="mx-16">
          <Text className=" font-custom text-2xl mt-5 mb-5">Please fill out the form below to add a job to the site: </Text>
          <Text className="font-custom mb-1 text-base">Start Date</Text>
          <TextInput 
            onChange={(e) => setStartDate(e.target.value)}
            className="font-custom border rounded py-1 mb-4"
            type="date"
            placeholder=" MM/DD/YYYY"
            name="start_date"
          />
          <Text className="font-custom mb-1 text-base">End Date</Text>
          <TextInput
            onChange={(e) => setEndDate(e.target.value)}
            className="font-custom border rounded py-1 mb-4"
            type="date"
            placeholder=" DD/MM/YYYY"
            name="end_date"
          />
          <Text className="font-custom mb-1 text-base">Daily Rate (£)</Text>
          <TextInput
            onChange={(e) => setDailyRate(e.target.value)}
            className="font-custom border rounded py-1 mb-4"
            type="number"
            placeholder=" 0"
            name="daily_rate"
          />
          <Text className="font-custom mb-1 text-base">Job Description</Text>
          <TextInput
            onChange={(e) => setJobDescription(e.target.value)}
            className="border rounded mb-4 py-8"
            type="text"
            placeholder=" (500)"
            name="job_description"
            aria-required="true"
          />
          <Pressable className="mx-5 px-6 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom items-center shadow-md" onPress={handleJobSubmit}>
            <Text>Add Job</Text>
          </Pressable>
          <Text>{message}</Text>
        </View>
      )}
      {/* {!isValid && <Text>{isValidMsg}</Text>} */}
      {/* <Text>{isPosting}</Text>
      <Text>{isErrorMsg}</Text> */}
      {!theUser && (
        <View>
          <Text>Welcome to Mind My Plants, {loggedInUser?.first_name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
export default addjobs;
