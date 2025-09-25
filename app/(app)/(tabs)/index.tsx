import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Post from "@/components/Post";
import PostFormModal from "@/components/PostFormModal";
import { useAuthSession } from "@/providers/authctx";
import { PostData } from "@/types/post";
import { getData, storeData } from "@/utils/local-storage";
import { Stack, router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userNameSession, isLoading } = useAuthSession();

  async function createPostLocal(newPost: PostData) {
    const updatedPostList = [...posts, newPost];
    storeData("postStore", JSON.stringify(updatedPostList));
    setPosts(updatedPostList);
  }

  async function deletePost(postId: string) {
    const updatedPostList = posts.filter(post => post.id !== postId);
    storeData("postStore", JSON.stringify(updatedPostList));
    setPosts(updatedPostList);
  }

  async function getPostsFromLocal() {
    const existingPosts = await getData("postStore");
    if (existingPosts) {
      setPosts(JSON.parse(existingPosts));
    }
  }

  useEffect(() => {
    getPostsFromLocal();
  }, []);

  // Refresh posts when screen comes into focus (e.g., returning from post details)
  useFocusEffect(
    useCallback(() => {
      getPostsFromLocal();
    }, [])
  );

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
        renderItem={(post) => <Post postData={post.item} onDelete={deletePost} />}
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
