export class Chat {
  chat_id: string;
  sender_id: string;
  last_message: string;
  date_of_last_message: string;
  sender_name: string;
  is_online: boolean;
  is_read: boolean;

  constructor(
    chat_id: string,
    sender_id: string,
    last_message: string,
    date_of_last_message: string,
    sender_name: string,
    is_online: boolean,
    is_read: boolean
  ) {
    this.chat_id = chat_id;
    this.sender_id = sender_id;
    this.last_message = last_message;
    this.date_of_last_message = date_of_last_message;
    this.sender_name = sender_name;
    this.is_online = is_online;
    this.is_read = is_read;
  }
}
