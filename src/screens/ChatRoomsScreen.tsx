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
import Card from '../components/Card/Card';

type ChatRoomsScreenParamList = {
  ChatRooms: undefined;
  Chat: { room: any };
};
type NavigationProps = NativeStackScreenProps<
  ChatRoomsScreenParamList,
  'ChatRooms'
>;

const ChatRoomsScreen = (({ navigation }) => {
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

  const renderChatRooms = ({ item }) => {
    return (
      <Card
        item={item}
        onPress={() => navigation.navigate('Chat', { room: item })}
      />
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
        <>
          <FlatList
            style={{ flex: 1 }}
            data={chatRooms}
            renderItem={renderChatRooms}
            keyExtractor={(item) => item._id}
          />
        </>
      </View>
    </SafeAreaView>
  );
}) as React.FC<NavigationProps>;

export default ChatRoomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',

    display: 'flex',
    flexDirection: 'column',
  },
});
