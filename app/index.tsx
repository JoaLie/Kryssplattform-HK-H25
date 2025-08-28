import Post from '@/components/Post';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([
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
  ]);

  return (
    <View style={styles.mainContainer}>
      <Modal
        visible={isModalVisible}
        style={styles.modalContainer}
        animationType='slide'
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Legg til nytt innlegg</Text>
          <Text style={styles.modalDescription}>Tittel</Text>
          <TextInput 
            placeholder='Tittel' 
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.modalDescription}>Innhold</Text>
          <TextInput 
            placeholder='Innhold' 
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <Pressable style={styles.saveButton} onPress={() => {
            setIsModalVisible(false);
            setPosts([...posts, {title: title, description: description}]);
            setTitle('');
            setDescription('');
          }}>
            <Text style={styles.saveButtonText}>Lagre</Text>
          </Pressable>
        </View>
      </Modal>
      <Stack.Screen options={{ headerRight: () => (
        <Pressable onPress={() => {setIsModalVisible(true)}}>
          <Text>Legg til nytt innlegg</Text>
        </Pressable>
      )

      }} />
    <FlatList 
        data={posts}
        ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
        renderItem={( post ) => 
          <Post 
            postData={post.item} 
            onDelete={() => {
              const newPosts = posts.filter((_, index) => index !== post.index);
              setPosts(newPosts);
            }}
          />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 0,
    marginLeft: '10%',
    alignSelf: 'flex-start',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});