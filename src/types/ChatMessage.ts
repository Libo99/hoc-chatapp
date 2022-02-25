import { User } from './User';

export interface ChatMessage {
  _id: string;
  text: string;
  createdAt: Date;
  user: User;
  image?: any;
}
