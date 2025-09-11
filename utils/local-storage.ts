  import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  export async function getPostByLocalId(id: string) {
    try {
        const data = await AsyncStorage.getItem("postStore");
        if (data !== null) {
          const posts: PostData[] = JSON.parse(data);
          return posts.find(post => post.id === id);
        }
    } catch (e) {
      console.log("Feil med getPostByIdLocal()", e)
    }
  }