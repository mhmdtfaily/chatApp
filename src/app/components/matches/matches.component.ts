import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit  {
  users: User[] = [];
  chats: Chat[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.getUsers();
    this.getChats();
  }
  ngOnInit() {
    this.getUsers();
    this.getChats();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        // this.users = users;
        this.users =users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  getChats() {

    let userId="15a5430f-c22d-4e8a-ae59-19004cbf5014";

    this.userService.getChats(userId).subscribe(
      (chats: Chat[]) => {
        // this.users = users;
        this.chats =chats;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
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
}
