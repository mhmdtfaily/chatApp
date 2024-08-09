import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import { DefaultResponse } from '../models/default_response.model';
import { Chat } from '../models/chat.model';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {}

  getChats(userId: string): Observable<Chat[]> {
    return this.http
      .get<DefaultResponse>(`${this.apiUrl}/${userId}/chats`)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Chat[];
          } else {
            return [];
          }
        })
      );
  }

  createChat(user1Id: string, user2Id: string): Observable<string> {
    return this.http
      .post<DefaultResponse>(`${this.apiUrl}/create`, {
        user1Id: user1Id,
        user2Id: user2Id,
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as string;
          } else {
            throw new Error('Chat creation failed');
          }
        })
      );
  }

  sendMessage(
    senderId: string,
    chatId: string,
    content: string
  ): Observable<boolean> {
    return this.http
      .post<DefaultResponse>(`${this.apiUrl}/send-message`, {
        sender_id: senderId,
        chat_id: chatId,
        content: content,
      })
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as boolean;
          } else {
            throw new Error('Chat creation failed');
          }
        })
      );
  }

  getConversation(chatId: string, userId: string): Observable<Conversation> {
    return this.http
      .get<DefaultResponse>(`${this.apiUrl}/conversation/${chatId}/${userId}`)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data as Conversation;
          } else {
            throw new Error(
              response.message || 'Failed to retrieve conversation'
            );
          }
        }),
        catchError((error) => {
          console.error('Error fetching conversation:', error);
          return throwError(() => error);
        })
      );
  }
}
