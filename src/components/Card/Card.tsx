import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChatRoom } from '../../types/ChatRoom';
import Room from './Room';

interface CardProps {
  room: ChatRoom;
  onPress: () => void;
}

const Card = (({ room, onPress }) => {
  return <>{room && <Room room={room} onPress={onPress} />}</>;
}) as React.FC<CardProps>;

export default Card;
