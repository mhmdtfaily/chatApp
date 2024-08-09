import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  fullName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.authenticate(this.email, this.fullName).subscribe({
      next: (user: User) => {
        if (user) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('my_id', user.id.toString());
          this.router.navigate(['/home']);
        } else {
          alert('Failed to authenticate');
        }
      },
      error: (err: any) => {
        console.error('Error during authentication', err);
        alert('An error occurred during authentication');
      },
      complete: () => {
        console.log('Authentication process completed.');
      },
    });
  }
}
