import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isLoggedIn = false;
  constructor(private router: Router, private auth: AuthService) {
    this.section = {
      account: false,
      order: true,
      wishlist: false,
    };
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

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
    localStorage.removeItem('id');

    this.auth.setAuthStatus(false);

    this.router.navigate(['/login']);
  }
}
