import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthProvider';

type Props = {};

const ChatRooms = (props: Props) => {
  const { currentUser } = useAuth();
  return (
    <View>
      <Text>Hi {currentUser.email}</Text>
      <Text>ChatRooms</Text>
    </View>
  );
};

export default ChatRooms;

const styles = StyleSheet.create({});
