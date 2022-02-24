import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { ChatMessage } from '../types/ChatMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Route, useRoute } from '@react-navigation/native';
import { ChatRoom } from '../types/ChatRoom';
import Card from '../components/Card/Card';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Icon } from 'react-native-elements';

type ChatRoomScreenParamList = {
  Chat: undefined;
};
type NavigationProps = NativeStackScreenProps<ChatRoomScreenParamList, 'Chat'>;

const ChatRoomScreen = (({ navigation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const { currentUser } = useAuth();
  const flatlistRef = useRef<any>(null);

  const route = useRoute<Route<string, { chatRoom: ChatRoom }>>();

  const { chatRoom } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: chatRoom.name });
  }, [chatRoom]);

  useEffect(() => {
    const messagesListener = firestore()
      .collection('chatrooms')
      .doc(chatRoom._id)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const messageData = doc.data();
          const data = {
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt,
            user: messageData.user,
            image: messageData.image,
          };

          return data;
        });
        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  const handleSend = async () => {
    await firestore()
      .collection('chatrooms')
      .doc(chatRoom._id)
      .collection('messages')
      .add({
        text: message,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
        image: response?.assets ? response.assets[0].uri : null,
      });
    await firestore()
      .collection('chatrooms')
      .doc(chatRoom._id)
      .set(
        {
          latestmessage: {
            text: message,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
    setMessage('');
    setResponse(null);
  };

  const onImageLibraryPress = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse
    );
  };

  const onCameraPress = () => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      },
      setResponse
    );
  };

  const renderMessages = ({ item }) => {
    return (
      <View style={styles.cardcontainer}>
        <Card chatMessage={item} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatlistRef}
        onContentSizeChange={() => flatlistRef.current.scrollToEnd()}
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(item) => item._id}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={handleSend}
          placeholder="Type a message...."
          placeholderTextColor="grey"
        />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon name="photo" onPress={onImageLibraryPress} />
            <Icon name="camera" onPress={onCameraPress} />
          </View>
          {response?.assets &&
            response?.assets.map(({ uri }) => (
              <View key={uri}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{ width: 100, height: 100 }}
                  source={{ uri: uri }}
                />
              </View>
            ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}) as React.FC<NavigationProps>;

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    color: 'black',
  },
  cardcontainer: {
    marginBottom: 2,
  },
});
