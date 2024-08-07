import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DefaultResponse } from '../models/default_response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  authenticate(email: string, fullName: string): Observable<boolean> {
    return this.http
      .post<DefaultResponse>(`${this.apiUrl}/login-or-create`, {
        email: email,
        fullName: fullName,
      })
      .pipe(
        map((response) => {
          if (response.data) {
            localStorage.setItem('email', email);
            return true;
          } else {
            localStorage.removeItem('email');
            return false;
          }
        })
      );
  }

  isLoggedIn(): boolean {
    // Your logic to check if the user is logged in

    return !!localStorage.getItem('email');
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
