import React from 'react';
import { ChatRoom } from '../../types/ChatRoom';
import Room from './Room';
import { ChatMessage } from '../../types/ChatMessage';
import Message from './Message';
import { Image, StyleSheet, View } from 'react-native';
import { useAuth } from '../../context/AuthProvider';

interface CardProps {
  chatRoom?: ChatRoom;
  onPress?: () => void;
  chatMessage?: ChatMessage;
}

const Card = (({ chatRoom, onPress, chatMessage }) => {
  const { currentUser } = useAuth();

  return (
    <>
      {chatRoom && <Room chatRoom={chatRoom} onPress={onPress} />}
      {chatMessage && <Message chatMessage={chatMessage} />}
    </>
  );
}) as React.FC<CardProps>;

export default Card;
