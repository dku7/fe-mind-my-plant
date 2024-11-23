import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../../global.css";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter()


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-assistant"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sitters"
        options={{
          title: "Sitters",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="hand-holding-droplet" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs/index"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Feather name="send" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen name="jobs/layout" options={{ href: null }} />
      <Tabs.Screen name="jobs/JobCard" options={{ href: null }} />
      <Tabs.Screen name="jobs/[userId]/[jobId]" options={{ href: null }} />
      <Tabs.Screen name="jobs/addjobs" options={{ href: null }} />
    </Tabs>
  );
}
