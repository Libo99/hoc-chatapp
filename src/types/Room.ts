import { ChatMessages } from "./ChatMessage";

export interface Room {
  _id: string;
  name: string;
  description: string;
  messages: ChatMessages;
}

