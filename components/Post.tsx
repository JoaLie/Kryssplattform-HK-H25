import { PostData } from "@/types/post";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type PostProps = {
    postData: PostData;
    onDelete: () => void;
}

export default function Post({ postData, onDelete }: PostProps) {
    return (
        <View style={styles.post}>
            <View style={styles.postContent}>
                <Text style={styles.postHeader}>{postData.title}</Text>
                <Text style={styles.postText}>{postData.description}</Text>
            </View>
            <Pressable style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteIcon}>🗑️</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1, // Dekker hele skjermen
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    post: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#c0c0c0',
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
      marginHorizontal: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    postContent: {
      flex: 1,
    },
    postText: {
      fontSize: 16,
      color: '#000',
    },
    postHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    deleteButton: {
      padding: 8,
      marginLeft: 10,
    },
    deleteIcon: {
      fontSize: 20,
    },
  });
  