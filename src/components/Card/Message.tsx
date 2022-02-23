import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChatMessage } from '../../types/ChatMessage';
import { useAuth } from '../../context/AuthProvider';

interface MessageProps {
  chatMessage: ChatMessage;
}

const Message = (({ chatMessage }) => {
  const { currentUser } = useAuth();
  return (
    <>
      <Image
        source={{
          uri:
            currentUser.uid !== chatMessage.user._id
              ? chatMessage.user.avatar
              : undefined,
        }}
        style={
          currentUser.uid !== chatMessage.user._id
            ? [styles.image, styles.otherimage]
            : [styles.image, styles.userimage]
        }
      />
      <View
        style={
          currentUser.uid === chatMessage.user._id
            ? [styles.bubble, styles.userbubble]
            : [styles.bubble, styles.otherbubble]
        }
      >
        <Text lineBreakMode="tail" numberOfLines={2}>
          {currentUser.displayName !== chatMessage.user.name
            ? chatMessage.user.name
            : ''}
        </Text>
        <Text>{chatMessage.text}</Text>
        <Text>{new Date(chatMessage.createdAt).toLocaleTimeString()}</Text>
      </View>
    </>
  );
}) as React.FC<MessageProps>;

export default Message;

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  userbubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
  },
  otherbubble: {
    alignSelf: 'flex-start',

    backgroundColor: 'grey',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userimage: {
    alignSelf: 'flex-end',
  },
  otherimage: {
    alignSelf: 'flex-start',
  },
});
