import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Card from '../components/Card/Card';

type ChatRoomsScreenParamList = {
  ChatRooms: undefined;
  ChatRoom: { chatRoom: any };
};
type NavigationProps = NativeStackScreenProps<
  ChatRoomsScreenParamList,
  'ChatRooms'
>;

const ChatRoomsScreen = (({ navigation }) => {
  const [chatRooms, setChatRooms] = useState<any>([]);
  const { currentUser, signOut } = useAuth();

  const fetchRooms = async () => {
    const rooms = await firestore().collection('chatrooms').orderBy('latestmessage.createdAt', 'desc').get();
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
        chatRoom={item}
        onPress={() => navigation.navigate('ChatRoom', { chatRoom: item })}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Text style={{ fontSize: 30, fontWeight: '800' }}>
          Hi {currentUser.displayName.split(' ')[0]}
        </Text>
        <TouchableOpacity onPress={signOut}>
          <Text>Signout</Text>
        </TouchableOpacity>
        <FlatList
          data={chatRooms}
          renderItem={renderChatRooms}
          keyExtractor={(item) => item._id}
        />
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
