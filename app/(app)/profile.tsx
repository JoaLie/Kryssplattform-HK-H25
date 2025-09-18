import { useAuthSession } from "@/providers/authctx";
import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfilePage() {
  const { signOut, userNameSession, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <View style={style.mainContainer}>
        <Text>Laster...</Text>
      </View>
    );
  }

  return (
    <View style={style.mainContainer}>
      <Text style={style.title}>Velkommen til appen!</Text>
      
      {!userNameSession ? (
        <View style={style.loginContainer}>
          <Text style={style.loginTitle}>Du må logge inn for å bruke appen</Text>
          <View style={style.buttonContainer}>
            <Pressable
              style={[style.button, style.primaryButton]}
              onPress={() => router.push("/authentication")}
            >
              <Text style={style.primaryButtonText}>Logg inn / Registrer deg</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={style.loggedInContainer}>
          <Text style={style.welcomeText}>Hei {userNameSession}!</Text>
          <Text style={style.infoText}>
            Trykk{" "}
            {
              <Link style={style.link} href={"/declarations"}>
                her
              </Link>
            }{" "}
            for informasjon om appen
          </Text>
          <View style={style.buttonContainer}>
            <Pressable
              style={[style.button, style.logoutButton]}
              onPress={() => signOut()}
            >
              <Text style={style.logoutButtonText}>Logg ut</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
  loginContainer: {
    marginTop: 32,
    alignItems: "center",
    width: "100%",
  },
  loginTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  loggedInContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 200,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
