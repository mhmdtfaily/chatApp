import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

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
      next: (success: boolean) => {
        if (success) {
          localStorage.setItem('email', this.email);
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
