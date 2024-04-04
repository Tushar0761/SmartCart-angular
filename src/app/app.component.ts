import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn =
    localStorage.getItem('isLoggedIn') && localStorage.getItem('_token')
      ? true
      : false;
  userId = 0;

  constructor(private auth: AuthService, private user: UserService) {}
  ngOnInit() {
    this.auth.userId$.subscribe((userId: number) => {
      this.userId = userId;
    });
    console.log('App loaded with uid ', this.userId);
    this.auth.setAuthStatus(this.isLoggedIn);
    this.getUserProfile();
  }

  getUserProfile() {
    this.user.getUserProfile().subscribe({
      next: (response: any) => {
        this.auth.setProfileName(response.username);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
