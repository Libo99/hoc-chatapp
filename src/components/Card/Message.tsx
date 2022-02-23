import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChatMessage } from '../../types/ChatMessage';

interface MessageProps {
  chatMessage: ChatMessage;
}

const Message = (({ chatMessage }) => {
  return (
    <View key={chatMessage._id}>
      <Text>{chatMessage.user.name}</Text>
      <Text>{chatMessage.text}</Text>
      <Text>{new Date(chatMessage.createdAt).toLocaleTimeString()}</Text>
      <Image
        source={{ uri: chatMessage.user.avatar }}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
}) as React.FC<MessageProps>;

export default Message;

const styles = StyleSheet.create({});
