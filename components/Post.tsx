import { PostData } from "@/types/post";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export type PostProps = {
  postData: PostData;
  onDelete?: (postId: string) => void;
};

export default function Post({ postData, onDelete }: PostProps) {
  console.log("Post rendering with imageUri:", postData.imageUri);
  
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/post-details/[id]",
          params: { id: postData.id },
        })
      }
    >
      <View style={styles.post}>
        {postData.imageUri && postData.imageUri.trim() !== "" && (
          <Image 
            source={{ uri: postData.imageUri }}
            style={styles.postImage} 
            resizeMode="cover" 
          />
        )}

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{postData.title}</Text>
          <Text style={styles.postDescription}>{postData.description}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.commentContainer}>
            <AntDesign name="message" size={24} color="black" />
            <Text style={styles.commentCount}>{postData.comments?.length || 0}</Text>
          </View>
          
          {onDelete && (
            <Pressable
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation(); // Prevent navigation when deleting
                onDelete(postData.id);
              }}
            >
              <AntDesign name="delete" size={20} color="#FF3B30" />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    color: "gray",
    marginBottom: 12,
  },
  postDescriptionContainer: {
    
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  commentCount: {
    fontSize: 16,
    color: "gray",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFE5E5",
  },
});
