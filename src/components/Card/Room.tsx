import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChatRoom } from '../../types/ChatRoom';
import { Button, ListItem } from 'react-native-elements';

interface CardProps {
  chatRoom: ChatRoom;
  onPress?: () => void;
}

const Room = (({ chatRoom, onPress }) => {
  return (
    <ListItem onPress={onPress} bottomDivider topDivider>
      <ListItem.Content>
        <ListItem.Title style={styles.cardtitle}>
          {chatRoom.name}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.cardsubtitle}>
          {chatRoom.description}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}) as React.FC<CardProps>;

export default Room;

const styles = StyleSheet.create({
  cardtitle: {
    fontSize: 20,
  },
  cardsubtitle: {
    fontSize: 12,
  },
});
