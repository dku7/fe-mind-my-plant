import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoggedInUserProvider } from "./contexts/loggedInUser";
import "../global.css";
import NewHeader from "./Header";
import { RoleProvider } from "./contexts/role";

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

  return (
    <LoggedInUserProvider>
      <RoleProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerTitle: '', headerBackground: (props) => <NewHeader {...props}/>}}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="profile" options={{headerTitle: 'Profile'}}/>
        <Stack.Screen name="Authentication/signin" options={{ headerTitle: '', headerBackground: (props) => <NewHeader {...props}/>}}/>
        <Stack.Screen name="Authentication/registration" options={{ headerTitle: '', headerBackground: (props) => <NewHeader {...props}/>}}/>
      </Stack>
      <StatusBar style="auto" />
      </RoleProvider>
    </LoggedInUserProvider>
  );
}
