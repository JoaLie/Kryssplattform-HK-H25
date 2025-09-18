import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthSessionProvider, useAuthSession } from "@/providers/authctx";

function RootLayoutNav() {
  const { userNameSession } = useAuthSession();

  return (
    <Stack>
      {userNameSession ? (
        <Stack.Screen
          name="Index"
          options={{
            headerShown: true,
          }}
        />
      ) : (
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="post-details" />
      <Stack.Screen name="declarations" />
      <Stack.Screen name="post-details/[id]" />
      <Stack.Screen name="authentication" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthSessionProvider>
      <RootLayoutNav />
    </AuthSessionProvider>
  );
}