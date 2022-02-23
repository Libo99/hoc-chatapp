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
    <View
      style={[
        styles.container,
        currentUser.uid === chatMessage.user._id ? styles.user : styles.other,
      ]}
    >
      <Image
        source={{
          uri: chatMessage.user.avatar,
        }}
        style={
          currentUser.uid !== chatMessage.user._id
            ? [styles.image, styles.otherimage]
            : [styles.image, styles.userimage]
        }
      />
      <View>
        <Text>{chatMessage.user.name}</Text>
        <View
          style={
            currentUser.uid === chatMessage.user._id
              ? [styles.bubble, styles.userbubble]
              : [styles.bubble, styles.otherbubble]
          }
        >
          <Text>{chatMessage.text}</Text>
        </View>
        <Text>
          {new Date(chatMessage.createdAt).toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            day: '2-digit',
            weekday: 'short',
          })}
        </Text>
      </View>
    </View>
  );
}) as React.FC<MessageProps>;

export default Message;

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    flex: 1,
  },
  user: {
    flexDirection: 'row-reverse',
  },
  other: {
    flexDirection: 'row',
  },
  bubble: {
    borderRadius: 9,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
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
