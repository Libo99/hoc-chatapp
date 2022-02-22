import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { ChatMessages } from '../types/ChatMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Route, useRoute } from '@react-navigation/native';
import { Room } from '../types/Room';


type ChatRoomScreenParamList = {
  Chat: undefined;
};
type NavigationProps = NativeStackScreenProps<ChatRoomScreenParamList, 'Chat'>;

const ChatRoom = (() => {
  const [messages, setMessages] = useState<ChatMessages[]>([]);
  const { currentUser } = useAuth();

  const route = useRoute<Route<string, { room: Room }>>();

  const { room } = route.params;
  useEffect(() => {
    const messagesListener = firestore()
      .collection('chatrooms')
      .doc(room._id)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const messageData = doc.data();
          console.log(messageData[0]);
          const data = {
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt,
            user: messageData.user,
          };

          console.log(data);
          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  
  const renderMessages = ({ item }) => {
    return (
      <View key={item._id}>
        <Text>{item.user.name}</Text>
        <Text>{item.text}</Text>
        <Text>{new Date(item.createdAt).toLocaleTimeString()}</Text>
        <Image
          source={{ uri: item.user.avatar }}
          style={{ height: 50, width: 50 }}
        />
      </View>
    );
  };
  return (
    <View style={styles.chatcontainer}>
      <FlatList
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}) as React.FC<NavigationProps>;

export default ChatRoom;

const styles = StyleSheet.create({
  chatcontainer: {
    flex: 1,
    paddingBottom: 20,
  },
});
