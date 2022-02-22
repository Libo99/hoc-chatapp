import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/ChatRoomScreen';
import ChatRooms from '../screens/ChatRoomsScreen';

const ChatStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatRooms" component={ChatRooms} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatStack;
