import { useAuthSession } from "@/providers/authctx";
import { PostComment, PostData } from "@/types/post";
import { getData, getPostByLocalId, storeData } from "@/utils/local-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function PostDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userNameSession } = useAuthSession();

  const [post, setPost] = useState<PostData | null>(null);
  const [comment, setComment] = useState("");

  async function fetchPostFromLocal(inputId: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const postLocal = await getPostByLocalId(inputId);
    if (postLocal) {
      setPost(postLocal);
    }
  }

  async function addComment() {
    if (!comment.trim() || !post || !userNameSession) return;

    const newComment: PostComment = {
      id: Date.now().toString(),
      comment: comment.trim(),
      username: userNameSession,
      timestamp: new Date(),
    };

    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment],
    };

    // Update local storage
    const allPosts = await getData("postStore");
    if (allPosts) {
      const posts = JSON.parse(allPosts);
      const updatedPosts = posts.map((p: PostData) => 
        p.id === post.id ? updatedPost : p
      );
      await storeData("postStore", JSON.stringify(updatedPosts));
    }

    setPost(updatedPost);
    setComment("");
  }

  useEffect(() => {
    fetchPostFromLocal(id);
  }, [id]);

  if (post === null) {
    return (
      <View>
        <Text>LASTER</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Post Image */}
      {post.imageUri && post.imageUri.trim() !== "" && (
        <Image 
          source={{ uri: post.imageUri }}
          resizeMode="cover" 
          style={styles.postImage}
        />
      )}
      
      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.description}</Text>
        
        {/* Comment Count */}
        <View style={styles.commentCountContainer}>
          <AntDesign name="message" size={20} color="#666" />
          <Text style={styles.commentCount}>{post.comments?.length || 0} kommentarer</Text>
        </View>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Kommentarer</Text>
        {post.comments?.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <Text style={styles.commentUsername}>{comment.username}</Text>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
        ))}
      </View>

      {/* Add Comment Section */}
      <View style={styles.addCommentSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Legg til kommentar..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <Pressable style={styles.addCommentButton} onPress={addComment}>
          <Text style={styles.addCommentButtonText}>Legg til</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  postImage: {
    width: "100%",
    height: 250,
  },
  postContent: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  commentCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentCount: {
    fontSize: 14,
    color: "#666",
  },
  commentsSection: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 8,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  commentItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#666",
  },
  addCommentSection: {
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 32, // Extra padding at bottom for better scrolling
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: "top",
  },
  addCommentButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  addCommentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
