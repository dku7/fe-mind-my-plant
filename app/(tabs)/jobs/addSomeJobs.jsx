import { View, Text } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoggedInUserContext } from "../../contexts/loggedInUser"


const addSomeJobs = () => {

  const { loggedInUser } = useContext(LoggedInUserContext)
  console.log(loggedInUser)
  

  return (
    <SafeAreaView>
      <View>
      <Text>Hi {loggedInUser}</Text>
      </View>
    </SafeAreaView>
  )
};
export default addSomeJobs;
