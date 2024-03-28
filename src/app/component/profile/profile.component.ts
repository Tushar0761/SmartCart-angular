import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;

  section: {
    account: boolean;
    order: boolean;
    wishlist: boolean;
  };

  constructor(private router: Router) {
    this.section = {
      account: true,
      order: false,
      wishlist: false,
    };
  }

  show(section: string) {
    this.section = {
      account: false,
      wishlist: false,
      order: false,
    };

    this.section[section as keyof typeof this.section] = true;
    console.table(this.section);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);
  }
}
