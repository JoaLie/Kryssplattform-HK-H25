import { useAuthSession } from "@/providers/authctx";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AuthenticationPage() {
  const [userNameText, setUserNameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const { signIn, signUp } = useAuthSession();
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuthAction = async () => {
    setErrorMessage("");
    
    if (isLoginMode) {
      if (userNameText.trim() && passwordText.trim()) {
        const success = await signIn(userNameText, passwordText);
        if (success) {
          setUserNameText("");
          setPasswordText("");
        } else {
          setErrorMessage("Feil brukernavn eller passord");
        }
      } else {
        setErrorMessage("Vennligst fyll ut alle felt");
      }
    } else {
      if (userNameText.trim() && passwordText.trim() && emailText.trim()) {
        const success = await signUp(userNameText, passwordText, emailText);
        if (success) {
          setUserNameText("");
          setPasswordText("");
          setEmailText("");
        } else {
          setErrorMessage("Brukernavn eller e-post eksisterer allerede");
        }
      } else {
        setErrorMessage("Vennligst fyll ut alle felt");
      }
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUserNameText("");
    setPasswordText("");
    setEmailText("");
    setErrorMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLoginMode ? "Logg inn" : "Registrer deg"}
      </Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Brukernavn"
          value={userNameText}
          onChangeText={setUserNameText}
        />
        
        <TextInput
          style={styles.textInput}
          placeholder="Passord"
          value={passwordText}
          onChangeText={setPasswordText}
          secureTextEntry={true}
        />
        
        {!isLoginMode && (
          <TextInput
            style={styles.textInput}
            placeholder="E-post"
            value={emailText}
            onChangeText={setEmailText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.authButton, styles.primaryButton]}
          onPress={handleAuthAction}
        >
          <Text style={styles.primaryButtonText}>
            {isLoginMode ? "Logg inn" : "Registrer bruker"}
          </Text>
        </Pressable>
        
        <Pressable
          style={[styles.authButton, styles.secondaryButton]}
          onPress={toggleMode}
        >
          <Text style={styles.secondaryButtonText}>
            {isLoginMode ? "Har du ikke konto? Registrer deg" : "Har du allerede konto? Logg inn"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  formContainer: {
    width: "100%",
    marginBottom: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  authButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
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
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
});