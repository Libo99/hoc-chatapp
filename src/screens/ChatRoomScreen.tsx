import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { ChatMessage } from '../types/ChatMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Route, useRoute } from '@react-navigation/native';
import { ChatRoom } from '../types/ChatRoom';
import Card from '../components/Card/Card';

type ChatRoomScreenParamList = {
  Chat: undefined;
};
type NavigationProps = NativeStackScreenProps<ChatRoomScreenParamList, 'Chat'>;

const ChatRoomScreen = (({ navigation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const { currentUser } = useAuth();

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
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(item) => item._id}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
        onSubmitEditing={handleSend}
        placeholder="Type a message...."
      />
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
    height: 30,
    backgroundColor: 'white',
  },
  cardcontainer: {
    marginBottom: 2,
  },
});
