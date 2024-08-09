export interface Message {
  is_me: boolean;
  message: string;
  date_of_message: string;
}

export interface Conversation {
  name: string;
  is_online: boolean;
  last_seen: string;
  messages: Message[];
}
