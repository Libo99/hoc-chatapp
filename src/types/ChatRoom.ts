import { ChatMessage } from './ChatMessage';

export interface ChatRoom {
  _id: string;
  name: string;
  description: string;
  messages: ChatMessage;
}
