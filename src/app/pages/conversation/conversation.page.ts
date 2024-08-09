import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from 'src/app/models/conversation.model';
import { ChatService } from 'src/app/services/chat.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  chatId: string | null = null;
  userId: string | null = null;
  my_id: string | null = null;
  conversation: Conversation | null = null; // Store the conversation data
  newMessage: any;
  socket: any;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService // Inject the service
  ) {
    this.socket = io('http://192.168.1.103:3000');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.chatId = params.get('chatId');
      this.userId = params.get('userId');
      this.my_id = localStorage.getItem('my_id');

      if (this.my_id) {
        if (this.chatId) {
          this.getChatByChatId(this.chatId);
        } else if (this.userId) {
          this.createChat(this.my_id, this.userId);
        }
        this.socket.emit('joinRoom', this.chatId);

        //Read all message (Set all message for this chat that the other send it in the database as read)
        //Api take the chat id and the sender id
        // put read at date (Date now) the message when chat id and sender id
      }

      this.onReceive();
    });
  }

  onReceive() {
    // Join the room when the component initializes
    if (this.chatId) {
      this.socket.emit('joinRoom', this.chatId);
    }

    // Listen for incoming messages
    this.socket.on('message', (message: string) => {
      console.log('Message received:', message);

      // Split the message if it's formatted with separators
      const [senderId, chatId, messageContent] = message.split('|');

      // Ensure the message belongs to the current chat and is not sent by the current user
      if (chatId === this.chatId && senderId !== this.my_id) {
        this.conversation?.messages.push({
          is_me: false, // Since this message is from another user
          message: messageContent,
          date_of_message: new Date().toISOString(),
        });
      }
    });
  }

  // Method to get chat by chat ID
  getChatByChatId(chatId: string) {
    if (this.my_id) {
      this.chatService.getConversation(chatId, this.my_id).subscribe(
        (conversation) => {
          this.conversation = conversation;
          console.log('Conversation:', this.conversation);
        },
        (error) => {
          console.error('Error fetching conversation:', error);
        }
      );
    }
  }

  // Method to create a chat if chatId is null
  createChat(user1Id: string, user2Id: string) {
    this.chatService.createChat(user1Id, user2Id).subscribe(
      (chatId) => {
        this.chatId = chatId;
        this.getChatByChatId(chatId); // After creating, fetch the conversation
      },
      (error) => {
        console.error('Error creating chat:', error);
      }
    );
  }
  // Method to format date
  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return '';
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  escapeDelimiter(input: string, delimiter: string): string {
    return input.replace(new RegExp(`\\${delimiter}`, 'g'), `\\${delimiter}`);
  }

  sendMessage() {
    if (this.my_id && this.chatId) {
      this.chatService
        .sendMessage(this.my_id, this.chatId, this.newMessage)
        .subscribe((isSuccess) => {
          if (isSuccess) {
            this.conversation?.messages.push({
              is_me: true,
              message: this.newMessage,
              date_of_message: Date(),
            });
            let saltedMsg = `${this.my_id}|${this.chatId}|${this.newMessage}`;

            this.socket.emit('message', saltedMsg, this.chatId);
            this.newMessage = '';
          }
        });
    }
  }
}
