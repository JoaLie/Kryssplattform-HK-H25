import Post from '@/components/Post';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  // TODO: import posts from post.ts, for use in the FlatList
  const posts = [
    {
      title: 'Mitt første innlegg',
      description: 'Helt vanvittig mye tekst her',
    },
    {
      title: 'Mitt andre innlegg',
      description: 'Helt vanvittig mye tekst her også! Vittig a gitt',
    },
    
    {
      title: 'Mitt tredje innlegg',
      description: 'Genialt Egon',
    },
    
    {
      title: 'Mitt fjerde innlegg',
      description: 'Jättekul, eller hur?',
    },
    
    {
      title: 'Mitt femte innlegg',
      description: 'Jeg er tom for ideer',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerRight: () => (
        <Pressable onPress={() => console.log('Knapp klikket')}>
          <Text>Knapp?</Text>
        </Pressable>
      )

      }} />
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