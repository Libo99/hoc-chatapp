import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Card from '../components/Card/Card';
import { Image } from 'react-native-elements';
import { AuthService } from '../services/Auth.service';
import { ChatroomService } from '../services/Chatroom.service';

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

  const getRooms = async () => {
    const rooms = await ChatroomService.fetchRooms();
    setChatRooms(rooms);
    setRefresh(false);
  };
  const onRefresh = async () => {
    setRefresh(true);
    await getRooms();
  };

  useEffect(() => {
    getRooms();
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
