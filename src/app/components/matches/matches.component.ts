import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  my_id: string | null = null;
  users: User[] = [];
  chats: Chat[] = [];
  socket: any;

  constructor(private userService: UserService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.onReceive();
    this.my_id = localStorage.getItem('my_id');
    if (this.my_id) {
      this.getUsers();
      this.getChats();
    }
  }

  getUsers() {
    if (this.my_id) {
      this.userService.getUsers(this.my_id).subscribe(
        (users: User[]) => {
          this.users = users;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  getChats() {
    if (this.my_id) {
      this.userService.getChats(this.my_id).subscribe(
        (chats: Chat[]) => {
          this.chats = chats;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  openConversation(chatId: string | null, userId: string | null) {
    if (chatId) {
      this.router.navigate(['/conversation', { chatId }]);
    } else if (userId) {
      this.router.navigate(['/conversation', { userId }]);
    } else {
      console.error('Both chatId and userId are null');
    }
  }

  onReceive() {
    // Listen for incoming messages
    this.socket.on('newMessage', (data: any) => {
      // Split the message if it's formatted with separators
      const [senderId, chatId, messageContent] = data.msg.split('|');

      const chatExists: Chat | undefined = this.chats.find(
        (chat) => chat.chat_id === chatId
      );
      if (!chatExists) {
        this.getChats();
      } else {
        chatExists.last_message = messageContent;
        chatExists.date_of_last_message = Date();
        chatExists.is_read = false;
      }
      // Sort the chats by the date of the last message
      this.chats.sort((a, b) => {
        const dateA = new Date(a.date_of_last_message).getTime();
        const dateB = new Date(b.date_of_last_message).getTime();
        return dateB - dateA; // Sort in descending order (newest first)
      });
    });
  }
}
