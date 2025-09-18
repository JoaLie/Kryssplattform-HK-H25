import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Post from "@/components/Post";
import PostFormModal from "@/components/PostFormModal";
import { useAuthSession } from "@/providers/authctx";
import { PostData } from "@/types/post";
import { getData, storeData } from "@/utils/local-storage";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userNameSession, isLoading } = useAuthSession();

  async function createPostLocal(newPost: PostData) {
    const updatedPostList = [...posts, newPost];
    storeData("postStore", JSON.stringify(updatedPostList));
    setPosts(updatedPostList);
  }

  async function getPostsFromLocal() {
    const exisitngPosts = await getData("postStore");
    if (exisitngPosts) {
      setPosts(JSON.parse(exisitngPosts));
    }
  }

  useEffect(() => {
    getPostsFromLocal();
  }, []);

  useEffect(() => {
    if (!isLoading && !userNameSession) {
      router.replace("/authentication");
    }
  }, [isLoading, userNameSession]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Laster...</Text>
      </View>
    );
  }

  if (!userNameSession) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          title: `Hei ${userNameSession}`,
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (!userNameSession) {
                  console.log(
                    "Du må være logget inn for å gjøre denne handlingen"
                  );
                  return;
                }
                setIsModalVisible(true);
              }}
            >
              <Text>Nytt innlegg</Text>
            </Pressable>
          ),
        }}
      />
      <PostFormModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        // Det nye innlegget dukker opp her, og vi kan legge det til i lista over innlegg
        addPost={createPostLocal}
      />
      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
