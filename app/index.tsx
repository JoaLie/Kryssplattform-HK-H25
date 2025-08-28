import Post from '@/components/Post';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  // TODO: import posts from post.ts, for use in the FlatList

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerRight: () => (
        <Pressable onPress={() => console.log('Knapp klikket')}>
          <Text>Knapp?</Text>
        </Pressable>
      )

      }} />
      <Modal
      visible
      >
        <Pressable onPress={() => console.log('Knapp klikket')}>
          <Text>Knapp?</Text>
        </Pressable>
      </Modal>
      <FlatList 
        data={posts}
        ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
        renderItem={( post ) => 
          <Post postData={post.item} />
      }
      />
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
});