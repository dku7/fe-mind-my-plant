import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoggedInUserProvider } from "./contexts/loggedInUser";
import "../global.css";
import { StyleSheet } from "nativewind";
import Header from "./Header";
import { Image } from "expo-image";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/PT Sans.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  function NewHeader() {
    return (
      <Image
        style={{ marginLeft: -20,marginTop: 35, width: 380, height: 100}}
        source={require("@/assets/images/header.png")}
      />
    );
  }

  return (
    <LoggedInUserProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerTitle: (props) => <NewHeader {...props} /> }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="profile" />
      </Stack>
      <StatusBar style="light" />
    </LoggedInUserProvider>
  );
}
