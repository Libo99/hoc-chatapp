import { ChatMessages } from "./ChatMessage";

export interface Room {
  id: string;
  name: string;
  description: string;
  messages: ChatMessages;
}

