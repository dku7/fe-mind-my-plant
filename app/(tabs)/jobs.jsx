import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { LoggedInUserContext } from "../contexts/loggedInUser";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const index = () => {
  const router = useRouter();
  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <SafeAreaView>
      <View className="flex justify-center">
        <Text className="font-bold text-5xl pt-4 pb-5 bg-green-900 text-white text-center">
          {loggedInUser?.username}'s Jobs
        </Text>
        <Link href="../components/addjobs">
          <Pressable className="mt-12 w-1/4 mx-28 py-2 border-green-700  rounded-md bg-green-700 text-gray-200 font-bold text-center">
            <Text>Add Job</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default index; /* 
onPress={() => router.push("/jobs/AddJobs")} */
