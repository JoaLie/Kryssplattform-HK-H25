import { getCurrentUser, loginUser, registerUser, setCurrentUser } from "@/utils/local-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    signIn: (username: string, password: string) => Promise<boolean>;
    signUp: (username: string, password: string, email: string) => Promise<boolean>;
    signOut: VoidFunction;
    userNameSession?: string | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuthSession must be used within an AuthContext Provider");
    }
    return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
    const [userSession, setUserSession] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setUserSession(user.username);
            }
            setIsLoading(false);
        });
    }, []);

    const handleSignIn = async (username: string, password: string): Promise<boolean> => {
        try {
            const user = await loginUser(username, password);
            if (user) {
                await setCurrentUser(user);
                setUserSession(user.username);
                return true;
            }
            return false;
        } catch (error) {
            console.log("Sign in error:", error);
            return false;
        }
    };

    const handleSignUp = async (username: string, password: string, email: string): Promise<boolean> => {
        try {
            const success = await registerUser(username, password, email);
            if (success) {
                const user = await loginUser(username, password);
                if (user) {
                    await setCurrentUser(user);
                    setUserSession(user.username);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log("Sign up error:", error);
            return false;
        }
    };

    const handleSignOut = () => {
        setCurrentUser(null);
        setUserSession(null);
    };

    return (
        <AuthContext.Provider value={{ 
            signIn: handleSignIn,
            signUp: handleSignUp,
            signOut: handleSignOut,
            userNameSession: userSession,
            isLoading: isLoading, 
            }}>
            {children}
        </AuthContext.Provider>
    )
}
