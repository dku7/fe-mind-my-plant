import { Tabs} from "expo-router";
import React from "react";
import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../../global.css";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { StyleSheet } from "nativewind";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {fontSize: 10, fontFamily: 'PT Sans', fontWeight: 700},
        tabBarActiveBackgroundColor: 'rgb(106, 153, 78)',
        // headerTitle: 'Mind My Plants',
        // headerTitleAlign: 'center',
        // headerTitleStyle: {fontSize: 30, fontWeight: 'bold'},
        // headerStyle: {backgroundColor: 'green'},
        // headerTintColor: 'white',
        // headerLeft: () => <Button title='Home' onPress={() => {router.push('/')}}></Button>,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: "Home",
          tabBarStyle: { backgroundColor: "#D77F33", height: 55},
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-assistant"
              size={24}
              color="rgb(254, 250, 224)"
            />
          ),
        }}
      />    
      <Tabs.Screen
        name="sitters"
        options={{
          title: "Sitters",
          tabBarStyle: { backgroundColor: "#D77F33", height: 55},
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="hand-holding-droplet" size={24} color="rgb(254, 250, 224)" />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs/index"
        options={{
          title: "Jobs",
          tabBarStyle: { backgroundColor: "#D77F33", height: 55},
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" size={24} color="rgb(254, 250, 224)" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarStyle: { backgroundColor: "#D77F33", height: 55},
          tabBarIcon: ({ color }) => (
            <Feather name="send" size={24} color="rgb(254, 250, 224)"/>
          ),
        }}
      />
     
      <Tabs.Screen name="jobs/layout" options={{tabBarStyle: { backgroundColor: "#D77F33", height: 55}, href: null }} />
      <Tabs.Screen name="jobs/JobCard" options={{tabBarStyle: { backgroundColor: "#D77F33", height: 55}, href: null }} />
      <Tabs.Screen name="jobs/[userId]/[jobId]" options={{tabBarStyle: { backgroundColor: "#D77F33", height: 55}, href: null }} />
      <Tabs.Screen name="jobs/addjobs" options={{ tabBarStyle: { backgroundColor: "#D77F33", height: 55}, href: null }} />
   
    </Tabs>
  );
}

const styles = StyleSheet.create({
  nav: {
    // color: 'blue',
      // height: 70,
      // borderWidth: 1,
      // borderRadius: 50,
      // borderColor: 'blue',
      // borderTopColor: 'blue',
      // backgroundColor: 'blue',
      // },
      // tabBarLabelStyle: {
      // fontSize: 12,
      // fontWeight: "bold",
      // marginBottom: 10,
      },
    })
