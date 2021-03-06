import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChatMessage } from '../../types/ChatMessage';
import { useAuth } from '../../context/AuthProvider';
import { DateService } from '../../services/Date.service';

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
      <View style={styles.bubblecontainer}>
        <Text style={styles.username}>{chatMessage.user.name}</Text>
        <View
          style={
            currentUser.uid === chatMessage.user._id
              ? [styles.bubble, styles.userbubble]
              : [styles.bubble, styles.otherbubble]
          }
        >
          <Text>{chatMessage.text}</Text>
          {chatMessage.image && (
            <Image
              source={{ uri: chatMessage.image }}
              style={{ height: 200, width: 200 }}
            />
          )}
        </View>

        <Text style={styles.date}>
          {DateService.formatDate(chatMessage.createdAt)}
        </Text>
      </View>
    </View>
  );
}) as React.FC<MessageProps>;

export default Message;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flex: 1,
    paddingHorizontal: 5,
  },
  user: {
    flexDirection: 'row-reverse',
  },
  other: {
    flexDirection: 'row',
  },
  bubblecontainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
    backgroundColor: 'lightblue',
  },
  otherbubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'darkgrey',
  },
  username: {
    fontSize: 10,
    marginBottom: 2,
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
  date: {
    fontSize: 9,
  },
});
