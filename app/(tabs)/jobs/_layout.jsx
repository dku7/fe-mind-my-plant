import { Stack } from "expo-router";
import { LoggedInUserProvider } from "@/app/contexts/loggedInUser";
import { Slot } from "expo-router";

export const JobsLayout = () => {
  return (
    <LoggedInUserProvider>
    {/* <Stack screenOptions={(headerTintColor = "blue")}>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="[jobId]" options={{headerShown: false}} /> */}
      <Slot />
    {/* </Stack> */}
    </LoggedInUserProvider>
  );
};
