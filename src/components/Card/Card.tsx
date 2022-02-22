import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface Room {
  id: string;
  name: string;
  description: string;
  messages: Messages;
}
interface Messages {
  text: string;
  createdAt: Date;
  user: any;
}

interface CardProps {
  item: Room;
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
    marginBottom: 5,
    borderColor: 'lightgrey',
    borderWidth: 0.6,
    paddingBottom: 3,
  },
  cardtitle: {
    fontSize: 20,
  },
  cardsubtitle: {
    fontSize: 12,
  },
});
