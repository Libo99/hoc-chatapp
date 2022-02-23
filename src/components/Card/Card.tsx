import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChatRoom } from '../../types/ChatRoom';

interface CardProps {
  item: ChatRoom;
  onPress: () => void;
}

const Card = (({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardcontainer} onPress={onPress}>
      <Text style={styles.cardtitle}>{item.name}</Text>
      <Text style={styles.cardsubtitle}>{item.description}</Text>
    </TouchableOpacity>
  );
}) as React.FC<CardProps>;

export default Card;

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
