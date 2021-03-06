import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { ChatMessage } from '../types/ChatMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Route, useRoute } from '@react-navigation/native';
import { ChatRoom } from '../types/ChatRoom';
import Card from '../components/Card/Card';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import { DateService } from '../services/Date.service';
import { ChatroomService } from '../services/Chatroom.service';

type ChatRoomScreenParamList = {
  Chat: undefined;
};
type NavigationProps = NativeStackScreenProps<ChatRoomScreenParamList, 'Chat'>;

const ChatRoomScreen = (({ navigation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userImage, setUserImage] = useState<any>();
  const { currentUser } = useAuth();
  const flatlistRef = useRef<any>(null);

  const route = useRoute<Route<string, { chatRoom: ChatRoom }>>();

  const { chatRoom } = route.params;

  //change header title based on room name
  useEffect(() => {
    navigation.setOptions({ title: chatRoom.name });
  }, [chatRoom]);

  useEffect(() => {
    //add a listener for the messages
    const messagesListener = firestore()
      .collection('chatrooms')
      .doc(chatRoom._id)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const messageData = doc.data();
          const data = {
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt,
            user: messageData.user,
            image: messageData.image,
          };

          return data;
        });
        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  const handleSend = async () => {
    await ChatroomService.handleSend(chatRoom, currentUser, message, userImage);
    setMessage('');
    setUserImage(null);
  };

  const onImageLibraryPress = async () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
      uploadImage
    );
  };

  //uploads to storage then gets image from storage
  //so it can be used in the handle send function
  const uploadImage = async (image: any) => {
    if (image.didCancel) return Alert.alert('Process Cancelled');
    try {
      const fileName = image.assets[0].fileName;
      const uri = image.assets[0].uri;
      const ref = storage().ref(`/images/${fileName}`);
      const uploadTask = ref.putFile(uri);
      uploadTask.on('state_changed', console.log, console.error, () => {
        ref.getDownloadURL().then((url) => {
          setUserImage(url);
        });
      });
    } catch (error: any) {
      Alert.alert('something wrong happened, try again');
      console.error(error.message);
    }
  };

  const onCameraPress = () => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      },
      uploadImage
    );
  };

  const renderMessages = ({ item }) => {
    return (
      <View style={styles.cardcontainer}>
        <Card chatMessage={item} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatlistRef}
        onContentSizeChange={() => flatlistRef.current.scrollToEnd()}
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(item) => item._id}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={handleSend}
          placeholder="Type a message...."
          placeholderTextColor="grey"
        />
        <View>
          <View style={styles.toolbar}>
            <Icon name="photo" onPress={onImageLibraryPress} />
            <Icon name="camera" onPress={onCameraPress} />
          </View>
          {userImage && (
            <View key={userImage}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={{ width: 100, height: 100 }}
                source={{ uri: userImage }}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}) as React.FC<NavigationProps>;

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    color: 'black',
  },
  cardcontainer: {
    marginBottom: 2,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
