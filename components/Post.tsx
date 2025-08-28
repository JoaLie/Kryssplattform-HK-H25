import { PostData } from "@/types/post";
import { StyleSheet, Text, View } from "react-native";

export type PostProps = {
    postData: PostData;
}

export default function Post({ postData }: PostProps) {
    return (
        <View style={styles.post}>
            <Text style={styles.postHeader}>{postData.title}</Text>
            <Text style={styles.postText}>{postData.description}</Text>
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
  });
  