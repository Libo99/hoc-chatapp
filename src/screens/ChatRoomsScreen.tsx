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
import { Image } from 'react-native-elements';
import { AuthService } from '../services/Auth.service';

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
  const { currentUser } = useAuth();
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchRooms = async () => {
    const rooms = await firestore()
      .collection('chatrooms')
      .orderBy('latestmessage.createdAt', 'desc')
      .get();
    const allRooms = rooms.docs.map((room) => {
      const roomData = room.data();
      const data = {
        _id: room.id,
        ...roomData,
      };
      return data;
    });
    setChatRooms(allRooms);
    setRefresh(false);
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    fetchRooms();
  };

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
      <View style={styles.userinfocontainer}>
        <View style={styles.userinfoleft}>
          <Image
            style={styles.userimage}
            source={{ uri: currentUser.photoURL }}
          />
          <Text style={styles.username}>
            Hi {currentUser.displayName.split(' ')[0]}
          </Text>
        </View>
        <TouchableOpacity style={styles.signout} onPress={AuthService.signOut}>
          <Text style={styles.signouttext}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refresh}
        onEndReachedThreshold={0.8}
        data={chatRooms}
        renderItem={renderChatRooms}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}) as React.FC<NavigationProps>;

export default ChatRoomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userinfocontainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    color: 'black',
    marginHorizontal: 5,
  },
  username: {
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
  },
  userinfoleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userimage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 5,
  },
  signout: {
    justifyContent: 'flex-start',
  },
  signouttext: {
    color: 'black',
  },
});
