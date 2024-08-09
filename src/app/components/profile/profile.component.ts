import { Component, OnInit } from '@angular/core';
import { DefaultResponse } from 'src/app/models/default_response.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  loading: boolean = true;
  my_id: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.my_id = localStorage.getItem('my_id');
    if (this.my_id) {
      this.fetchUser(this.my_id);
    }
  }

  fetchUser(id: string) {
    this.userService.getUser(id).subscribe({
      next: (response: DefaultResponse) => {
        this.user = response.data;
        console.log('User data:', this.user);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching user', err);
      },
    });
  }
}
