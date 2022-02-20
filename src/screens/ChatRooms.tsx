import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthProvider';

type Props = {};

const ChatRooms = (props: Props) => {
  const { currentUser, signOut } = useAuth();
  return (
    <View>
      <Text>Hi {currentUser.email}</Text>
      <Text>ChatRooms</Text>
      <TouchableOpacity onPress={signOut}>
      <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatRooms;

const styles = StyleSheet.create({});
