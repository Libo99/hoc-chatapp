import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ChatRoom } from '../types/ChatRoom';
import { DateService } from './Date.service';

export class ChatroomService {
  //gets the chatrooms
  public static async fetchRooms() {
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
    return allRooms;
  }

  public static async handleSend(
    chatRoom: ChatRoom,
    user: FirebaseAuthTypes.User,
    message: string,
    userImage: any
  ) {
    await firestore()
      .collection('chatrooms')
      .doc(chatRoom._id)
      .collection('messages')
      .add({
        text: message,
        createdAt: DateService.getNewDate(),
        user: {
          _id: user.uid,
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        },
        image: userImage ? userImage : null,
      });
    await firestore()
      .collection('chatrooms')
      .doc(chatRoom._id)
      .set(
        {
          latestmessage: {
            text: message,
            createdAt: DateService.getNewDate(),
          },
        },
        { merge: true }
      );
  }
}
