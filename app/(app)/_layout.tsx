import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

import { useAuthSession } from "@/providers/authctx";
import { Text, View } from "react-native";

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
  const { userNameSession, isLoading } = useAuthSession();

  if (isLoading) {
    return <View>
      <Text>Laster...</Text>
    </View>;
  }

  if (!userNameSession) {
    return <Redirect href={"/authentication"} />;
  }

  return (
    
      <RootLayoutNav />
  );
}