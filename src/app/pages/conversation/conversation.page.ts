import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  chatId: string | null=null;
  userId: string | null=null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chatId = params.get('chatId');
      this.userId = params.get('userId');

      console.log('Chat ID:', this.chatId);
      console.log('User ID:', this.userId);
    });
  }

  //Create chat if chatId null
  //else get message by chat id 

  





}
