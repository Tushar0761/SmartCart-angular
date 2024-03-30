import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private router: Router, private user: UserService) {
    this.section = {
      account: true,
      order: false,
      wishlist: false,
    };
  }

  isLoggedIn =
    localStorage.getItem('isLoggedIn') && localStorage.getItem('_token')
      ? true
      : false;

  section: {
    account: boolean;
    order: boolean;
    wishlist: boolean;
  };

  show(section: string) {
    this.section = {
      account: false,
      wishlist: false,
      order: false,
    };
    this.section[section as keyof typeof this.section] = true;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('_token');

    this.router.navigate(['/login']);
  }
}
