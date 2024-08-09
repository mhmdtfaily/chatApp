import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import { DefaultResponse } from '../models/default_response.model';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${this.apiUrl}/profile/${id}`);
  }

  getUsers(userId: string): Observable<User[]> {
    return this.http.get<DefaultResponse>(`${this.apiUrl}/${userId}`).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.data as User[];
        } else {
          return [];
        }
      })
    );
  }

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
}
