import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View>
      <View style={styles.post}>
        <Text style={styles.postHeader}>Mitt første innlegg</Text>
        <View>
          <Text style={styles.postText}>Helt vanvittig mye tekst her</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#d9d9d9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
