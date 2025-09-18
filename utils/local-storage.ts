import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserData {
  id: string;
  username: string;
  password: string;
  email: string;
}

export async function storeData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Stored!");
  } catch (e) {
    console.log("Feil med storeData()" + e);
  }
}

export async function getPostByLocalId(id: string) {
  try {
    const data = await AsyncStorage.getItem("postStore");
    if (data !== null) {
      console.log(data);
      const posts: PostData[] = JSON.parse(data);
      const post = posts.find((post: PostData) => post.id === id);
      if (post) {
        return post;
      }
      return null;
    }
  } catch (e) {
    console.log("Feil med getPostByLocalId()" + e);
  }
}

export async function getData(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      console.log(data);
      return data;
    }
  } catch (e) {
    console.log("Feil med storeData()" + e);
  }
}

export async function registerUser(username: string, password: string, email: string): Promise<boolean> {
  try {
    const existingUsersData = await AsyncStorage.getItem("users");
    const existingUsers: UserData[] = existingUsersData ? JSON.parse(existingUsersData) : [];
    
    const userExists = existingUsers.find(user => user.username === username || user.email === email);
    if (userExists) {
      console.log("Bruker eksisterer allerede");
      return false;
    }
    
    const newUser: UserData = {
      id: Date.now().toString(),
      username,
      password,
      email
    };
    
    const updatedUsers = [...existingUsers, newUser];
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("Bruker registrert:", newUser.username);
    return true;
  } catch (e) {
    console.log("Feil med registrering:", e);
    return false;
  }
}

export async function loginUser(username: string, password: string): Promise<UserData | null> {
  try {
    const usersData = await AsyncStorage.getItem("users");
    if (!usersData) {
      console.log("Ingen brukere funnet");
      return null;
    }
    
    const users: UserData[] = JSON.parse(usersData);
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      console.log("Innlogging vellykket:", user.username);
      return user;
    } else {
      console.log("Feil brukernavn eller passord");
      return null;
    }
  } catch (e) {
    console.log("Feil med innlogging:", e);
    return null;
  }
}

export async function getCurrentUser(): Promise<UserData | null> {
  try {
    const currentUserData = await AsyncStorage.getItem("currentUser");
    if (currentUserData) {
      return JSON.parse(currentUserData);
    }
    return null;
  } catch (e) {
    console.log("Feil med å hente bruker:", e);
    return null;
  }
}

export async function setCurrentUser(user: UserData | null): Promise<void> {
  try {
    if (user) {
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("currentUser");
    }
  } catch (e) {
    console.log("Feil med å sette bruker:", e);
  }
}