import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DefaultResponse } from '../models/default_response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  authenticate(email: string, fullName: string): Observable<User> {
    return this.http
      .post<DefaultResponse>(`${this.apiUrl}/login-or-create`, {
        email: email,
        fullName: fullName,
      })
      .pipe(
        map((response) => {
          const user: User = response.data as User;
          if (response.isSuccess) {
            localStorage.setItem('email', email);
            localStorage.setItem('my_id', user.id.toString());
            return user;
          } else {
            localStorage.removeItem('email');
            throw new Error('Authentication failed');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error('Authentication failed'));
        })
      );
  }

  isLoggedIn(): boolean {
    // Your logic to check if the user is logged in
    return !!localStorage.getItem('my_id');
  }

  login(user: { username: string; password: string }): boolean {
    // Replace this with real authentication logic
    if (user.username === 'test' && user.password === 'test') {
      localStorage.setItem('user', JSON.stringify(user));
      return true; // Return true if login is successful
    }
    return false; // Return false if login fails
  }

  logout(): void {
    localStorage.removeItem('email');
  }
}
