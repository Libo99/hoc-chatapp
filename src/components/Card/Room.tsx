import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChatRoom } from '../../types/ChatRoom';

interface CardProps {
  chatRoom: ChatRoom;
  onPress?: () => void;
}

const Room = (({ chatRoom, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardcontainer} onPress={onPress}>
      <Text style={styles.cardtitle}>{chatRoom.name}</Text>
      <Text style={styles.cardsubtitle}>{chatRoom.description}</Text>
    </TouchableOpacity>
  );
}) as React.FC<CardProps>;

export default Room;

const styles = StyleSheet.create({
  cardcontainer: {
    borderRadius: 3,
    marginVertical: 5,
    borderColor: 'lightgrey',
    borderBottomWidth: 0.6,
    paddingBottom: 3,
  },
  cardtitle: {
    fontSize: 20,
  },
  cardsubtitle: {
    fontSize: 12,
  },
});
