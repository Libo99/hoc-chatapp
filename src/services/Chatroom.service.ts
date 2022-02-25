import firestore from '@react-native-firebase/firestore';

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
}
