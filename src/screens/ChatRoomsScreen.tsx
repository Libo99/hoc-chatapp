import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ChatRoomsScreenParamList = {
  ChatRooms: undefined;
  Chat: { chat: any };
};
type NavigationProps = NativeStackScreenProps<
  ChatRoomsScreenParamList,
  'ChatRooms'
>;

const ChatRooms = (({ navigation }) => {
  const [chatRooms, setChatRooms] = useState<any>([]);
  const { currentUser, signOut } = useAuth();

  const fetchRooms = async () => {
    const rooms = await firestore().collection('chatrooms').get();
    const allRooms = rooms.docs.map((room) => {
      const roomData = room.data();
      const data = {
        _id: room.id,
        ...roomData,
      };
      return data;
    });
    setChatRooms(allRooms);
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    console.log(chatRooms);
  });
  const renderChatRooms = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chat', item)}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Text>Hi {currentUser.displayName}</Text>
        <Text>ChatRooms</Text>
        {/* <TouchableOpacity onPress={signOut}>
          <Text>SignOut</Text>
        </TouchableOpacity> */}
        <FlatList
          style={{ flex: 1 }}
          data={chatRooms}
          renderItem={renderChatRooms}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
}) as React.FC<NavigationProps>;

export default ChatRooms;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
  },
});
