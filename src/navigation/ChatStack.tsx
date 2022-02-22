import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/ChatRoomScreen';
import ChatRooms from '../screens/ChatRoomsScreen';

const ChatStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="ChatRooms" component={ChatRooms} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatStack;
