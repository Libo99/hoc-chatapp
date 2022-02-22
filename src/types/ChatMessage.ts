import { User } from './User';

export interface ChatMessages {
  _id: string;
  text: string;
  createdAt: Date;
  user: User;
}
