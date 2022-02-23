import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatRoomsScreen from '../screens/ChatRoomsScreen';

const ChatStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatRooms"
        component={ChatRoomsScreen}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
